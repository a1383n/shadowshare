using System.Text.Json.Serialization;

namespace Entities.Common;

public interface IEntity
{
    //
}

public interface IEntity<TKey> : IEntity
{
    TKey Id { get; set; }
}

public abstract class BaseEntity<TKey> : IEntity<TKey> where TKey : IEquatable<TKey>
{
    public TKey Id { get; set; }
}

public abstract class BaseRedisEntity : IEntity
{
    [JsonPropertyOrder(0)]
    public Guid Id { get; set; } = Guid.NewGuid();
}
