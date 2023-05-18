using StackExchange.Redis;

namespace Data.Contracts;

public interface IFileRepository : IRepository<Entities.FileCollection>
{
    public Task<long> IncrementDownloadCountAsync(Guid id,Guid fileId,uint value = 1);
    public Task<bool> SetAsync(Entities.FileCollection collection);
}
