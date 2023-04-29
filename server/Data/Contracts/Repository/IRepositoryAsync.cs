using Entities.Common;
using StackExchange.Redis;

namespace Data.Contracts;

public interface IRepositoryAsync<TEntity> where TEntity : class, IEntity
{
    Task<bool> SetAsync(RedisKey key, TEntity entity);
    Task<TEntity?> GetAsync(RedisKey key);
    Task<bool> DeleteAsync(RedisKey key);
}
