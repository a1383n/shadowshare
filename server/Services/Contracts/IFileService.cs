using Entities;

namespace Services;

public interface IFileService
{
    CryptoInfo GenerateCryptoInfo(string password);
    Stream ReadFile(Guid id, Guid fileId);
    Stream ReadEncryptedFile(Guid id, Guid fileId, CryptoInfo cryptoInfo);
    string GetFileHash(Stream stream);
    Task WriteFileAsync(Stream stream,Guid id, Guid fileId);
    Task WriteEncryptedFileAsync(Stream stream,Guid id, Guid fileId, CryptoInfo cryptoInfo);
    Task DeleteAsync(Guid id);
}
