using Entities.Common;
using System.Text.Json.Serialization;

namespace Entities;

public class FileCollection : BaseRedisEntity
{
    [JsonPropertyOrder(1)]
    public List<FileInfo> Files { get; set; }

    [JsonPropertyOrder(4)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; set; }

    [JsonPropertyOrder(2)]
    public TimeSpan ExpireAt { get; set; }

    [JsonPropertyOrder(3)]
    public uint RemainingDownloadCount { get; set; }

    [JsonPropertyOrder(5)]
    public bool IsEncrypted { get; set; } = false;

    [JsonPropertyOrder(6)]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public CryptoInfo? CryptoInfo { get; set; }
}
