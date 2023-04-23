using System.Text.Json;

namespace ShadowShareAPI.Core.Data.Models;

public class File : IEntity
{
    public Guid Id { get; private set; }

    public readonly string FileName;
    public readonly DateTime DeleteAt;
    public readonly uint DeleteAfter;

    public File(Guid id, string fileName, DateTime deleteAt, uint deleteAfter)
    {
        Id = id;
        FileName = fileName;
        DeleteAt = deleteAt;
        DeleteAfter = deleteAfter;
    }

    public static File FromFormFile(FormFile file, DateTime deleteAt, uint deleteAfter)
    {
        return new File(Guid.NewGuid(), file.FileName, deleteAt, deleteAfter);
    }

    public string ToJson()
    {
        return JsonSerializer.Serialize(this);
    }
}
