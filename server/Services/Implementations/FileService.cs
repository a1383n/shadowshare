using Entities;
using System.Security.Cryptography;

namespace Services;

public class FileService : IFileService
{
    public readonly int ITERATION = 10_000;
    public readonly int KEY_SIZE = 256;
    public readonly int BLOCK_SIZE = 128;

    private readonly string _storageLocation;

    public FileService(string storageLocation)
    {
        _storageLocation = storageLocation;
    }

    private string GetFilePath(Guid id)
    {
        return Path.Combine(_storageLocation, id.ToString());
    }

    private CryptoStream GetCryptoStream(Stream target, ICryptoTransform transform, CryptoStreamMode streamMode)
    {
        return new CryptoStream(target, transform, streamMode);
    }

    public Task DeleteFileAsync(Guid fileId)
    {
        return Task.Run(() => { System.IO.File.Delete(GetFilePath(fileId)); });
    }

    public CryptoInfo GenerateCryptoInfo(string password)
    {
        return CryptoInfo.Create(password,KEY_SIZE,BLOCK_SIZE,ITERATION);
    }

    public Stream ReadEncryptedFile(Guid fileId, CryptoInfo cryptoInfo)
    {
        return GetCryptoStream(ReadFile(fileId), cryptoInfo.GetAes().CreateDecryptor(),CryptoStreamMode.Read);
    }

    public Stream ReadFile(Guid fileId)
    {
        return new FileStream(GetFilePath(fileId), FileMode.Open, FileAccess.Read, FileShare.Read);
    }

    public async Task WriteEncryptedFileAsync(Stream stream, Guid fileId, CryptoInfo cryptoInfo)
    {
        using FileStream fileStream = new(GetFilePath(fileId), FileMode.CreateNew, FileAccess.Write, FileShare.Write);
        using CryptoStream cryptoStream = GetCryptoStream(fileStream, cryptoInfo.GetAes().CreateEncryptor(), CryptoStreamMode.Write);
        await stream.CopyToAsync(cryptoStream);
    }

    public async Task WriteFileAsync(Stream stream, Guid fileId)
    {
        using FileStream fileStream = new(GetFilePath(fileId),FileMode.CreateNew,FileAccess.Write,FileShare.Write);
        await stream.CopyToAsync(fileStream);
    }

    public string GetFileHash(Stream stream)
    {
        using var sha256 = SHA256.Create();
        byte[] hash = sha256.ComputeHash(stream);
        return BitConverter.ToString(hash)
            .Replace("-", string.Empty)
            .ToLower();
    }
}
