using Entities.Common;
using StackExchange.Redis;

namespace Data.Contracts;

public interface IRepository<TEntity> : IRepositoryAsync<TEntity> where TEntity : class, IEntity
{
    bool Set(RedisKey key, TEntity entity);
    TEntity? Get(RedisKey key);
    bool Delete(RedisKey key);
}
