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

    public async Task<long> IncrementDownloadCountAsync(Guid id, Guid fileId, uint value = 1)
    {
        FileCollection? collection = await GetAsync(id.ToString());
        if (collection != null)
        {
            int index = collection.Files.FindIndex((file) => file.Id == fileId);
            if (index >= 0)
            {
                collection.Files[index].DownloadCount += 1;
                await UpdateAsync(collection);
                return collection.Files[index].DownloadCount;
            }
            else
            {
                return -1;
            }
        }else
        {
            return -1;
        }
    }

    public Task<bool> SetAsync(FileCollection collection)
    {
        return _database.StringSetAsync(collection.Id.ToString(),SerializeEntity(collection),collection.ExpireAt,false,When.NotExists);
    }
}
