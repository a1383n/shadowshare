using StackExchange.Redis;

namespace Data.Contracts;

public interface IFileRepository : IRepository<Entities.FileCollection>
{
    public Task<long> DecrementDownloadCountAsync(RedisKey key,Guid id,uint value = 1);
    public Task<bool> SetAsync(Entities.FileCollection collection);
}
