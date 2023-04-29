using Entities;

namespace Services;

public interface IFileService
{
    CryptoInfo GenerateCryptoInfo(string password);
    Stream ReadFile(Guid fileId);
    Stream ReadEncryptedFile(Guid fileId, CryptoInfo cryptoInfo);
    string GetFileHash(Stream stream);
    Task WriteFileAsync(Stream stream, Guid fileId);
    Task WriteEncryptedFileAsync(Stream stream, Guid fileId, CryptoInfo cryptoInfo);
    Task DeleteFileAsync(Guid fileId);
}
