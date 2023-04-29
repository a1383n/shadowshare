using Data.Contracts;
using Entities;
using StackExchange.Redis;

namespace Data.Repositories;

public class FileRepository : Repository<Entities.FileCollection>, IFileRepository
{
    public FileRepository(ApplicationDatabaseContext databaseContext) : base(databaseContext.GetDatabase())
    {
        //
    }

    private Task<bool> UpdateAsync(Entities.FileCollection collection)
    {
        return _database.StringSetAsync(collection.Id.ToString(), SerializeEntity(collection), null, true, When.Exists);
    }

    public async Task<long> DecrementDownloadCountAsync(RedisKey key, Guid id, uint value = 1)
    {
        var collection = await GetAsync(key);
        if (collection!.RemainingDownloadCount >= value)
        {
            collection!.RemainingDownloadCount -= value;
        }else
        {
            collection!.RemainingDownloadCount = 0;
        }

        return await UpdateAsync(collection) ? collection.RemainingDownloadCount : -1;
    }

    public Task<bool> SetAsync(FileCollection collection)
    {
        return _database.StringSetAsync(collection.Id.ToString(),SerializeEntity(collection),collection.ExpireAt,false,When.NotExists);
    }
}
