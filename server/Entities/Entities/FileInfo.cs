namespace Entities;
public class FileInfo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public required string Name { get; set; }
    public uint DownloadCount { get; set; } = 0;
    public required string ContentType { get; set; }
    public long Size { get; set; }
    public required string Hash { get; set; }
}