using Data.Contracts;
using Entities;
using Entities.Common;
using StackExchange.Redis;
using System.Text.Json;

namespace Data.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
{
    protected readonly IDatabase _database;

    protected Repository(IDatabase database)
    {
        _database = database;
    }

    public bool Delete(RedisKey key)
    {
        return _database.KeyDelete(key);
    }

    public Task<bool> DeleteAsync(RedisKey key)
    {
        return _database.KeyDeleteAsync(key);
    }

    protected TEntity? GetEntity(RedisValue value)
    {
        if (value.HasValue)
        {
            return JsonSerializer.Deserialize<TEntity>(value.ToString());
        }else
        {
            return null;
        }
    }

    protected RedisValue SerializeEntity(TEntity entity)
    {
        return new(JsonSerializer.Serialize(entity));
    }

    public TEntity? Get(RedisKey key)
    {
        return GetEntity(_database.StringGet(key));
    }

    public async Task<TEntity?> GetAsync(RedisKey key)
    {
        return GetEntity(await _database.StringGetAsync(key));
    }

    public bool Set(RedisKey key, TEntity entity)
    {
        return _database.StringSet(key, SerializeEntity(entity));
    }

    public Task<bool> SetAsync(RedisKey key, TEntity entity)
    {
        return _database.StringSetAsync(key, SerializeEntity(entity));
    }
}
