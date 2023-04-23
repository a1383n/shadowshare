namespace ShadowShareAPI.Core.Data.Models;

public class File : IEntity
{
    public Guid Id { get; private set; }

    public readonly FileStream Stream;
    public readonly string FileName;
    public readonly string ContentType;

    public File(Guid id, FileStream stream, string fileName, string contentType)
    {
        Id = id;
        Stream = stream;
        FileName = fileName;
        ContentType = contentType;
    }
}
