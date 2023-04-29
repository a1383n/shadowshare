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

    private string GetFilePath(Guid id,Guid fileId)
    {
        return Path.Combine(_storageLocation, id.ToString(),fileId.ToString());
    }

    private void InitDirectory(Guid id)
    {
        Directory.CreateDirectory(Path.Combine(_storageLocation,id.ToString()));
    }

    private CryptoStream GetCryptoStream(Stream target, ICryptoTransform transform, CryptoStreamMode streamMode)
    {
        return new CryptoStream(target, transform, streamMode);
    }

    public Task DeleteAsync(Guid id)
    {
        return Task.Run(() => { System.IO.Directory.Delete(Path.Combine(_storageLocation,id.ToString()),true); });
    }

    public CryptoInfo GenerateCryptoInfo(string password)
    {
        return CryptoInfo.Create(password,KEY_SIZE,BLOCK_SIZE,ITERATION);
    }

    public Stream ReadEncryptedFile(Guid id, Guid fileId, CryptoInfo cryptoInfo)
    {
        return GetCryptoStream(ReadFile(id,fileId), cryptoInfo.GetAes().CreateDecryptor(),CryptoStreamMode.Read);
    }

    public Stream ReadFile(Guid id,Guid fileId)
    {
        return new FileStream(GetFilePath(id, fileId), FileMode.Open, FileAccess.Read, FileShare.Read);
    }

    public async Task WriteEncryptedFileAsync(Stream stream,Guid id, Guid fileId, CryptoInfo cryptoInfo)
    {
        InitDirectory(id);
        using FileStream fileStream = new(GetFilePath(id, fileId), FileMode.CreateNew, FileAccess.Write, FileShare.Write);
        using CryptoStream cryptoStream = GetCryptoStream(fileStream, cryptoInfo.GetAes().CreateEncryptor(), CryptoStreamMode.Write);
        await stream.CopyToAsync(cryptoStream);
    }

    public async Task WriteFileAsync(Stream stream, Guid id, Guid fileId)
    {
        InitDirectory(id);
        using FileStream fileStream = new(GetFilePath(id, fileId),FileMode.CreateNew,FileAccess.Write,FileShare.Write);
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
