using System.Security.Cryptography;

namespace ShadowShareAPI.Dto;

public class FileInfoDto
{
    public Entities.FileInfo FileInfo { get; set; }

    public Stream Stream { get; set; }

    public static List<FileInfoDto> FromFileCollection(IFormFileCollection files)
    {
        return files.Select((f) =>
        {
            var stream = f.OpenReadStream();
            return new FileInfoDto
            {
                Stream = stream,
                FileInfo = new Entities.FileInfo
                {
                    Name = f.FileName,
                    ContentType = f.ContentType,
                    Size = f.Length,
                    Hash = CalculateFileHash(stream)
                }
            };
        }).ToList();
    }

    public static string CalculateFileHash(Stream stream)
    {
        using SHA256 sha256 = SHA256.Create();
        byte[] hash = sha256.ComputeHash(stream);
        stream.Position = 0;
        return BitConverter.ToString(hash, 0, hash.Length).Replace("-",string.Empty).ToLower();
    }
}
