using ShadowShareAPI.Core.Data.FormData;
using ShadowShareAPI.Infrastructure.Services;
using StackExchange.Redis;

namespace ShadowShareAPI.Infrastructure.Data.Repository;

public interface IFileRepository
{
    public Task<Guid> Save(FileFormData fileFormData);
    public Task<Core.Data.Models.File?> GetFile(Guid id);
}

public class FileRepository : IFileRepository
{
    private readonly IFileService _fileService;
    private readonly IDatabase _database;

    public FileRepository(IFileService fileService, RedisContext redisContext)
    {
        _fileService = fileService;
        _database = redisContext.GetDatabase();
    }

    private HashEntry[] getHashEntries(uint deleteWith,string filename, string contentType)
    {
        return new HashEntry[]
        {
            new HashEntry("deleteWith",deleteWith),
            new HashEntry("fileName", filename),
            new HashEntry("contentType", contentType)
        };
    }


    async Task<Guid> IFileRepository.Save(FileFormData fileFormData)
    {
        Guid id = Guid.NewGuid();

        Task task1 = Task.Run(async () => {
            await _database.HashSetAsync(id.ToString(), getHashEntries(fileFormData.DeleteWithDownloadCount,fileFormData.File.FileName,fileFormData.File.ContentType));
            await _database.KeyExpireAsync(id.ToString(), fileFormData.DeleteAfterToDateTime());
        });

        await Task.WhenAll(task1,_fileService.Save(id,fileFormData.File));

        return id;
    }

    async Task<Core.Data.Models.File?> IFileRepository.GetFile(Guid id)
    {
        var hashEntries = await _database.HashGetAllAsync(id.ToString());

        if (hashEntries.Length == 0)
        {
            return null;
        }else
        {
            if (int.Parse(hashEntries[0].Value) == 1)
            {
                await _database.KeyDeleteAsync(id.ToString());
            }
            else
            {
                await _database.HashDecrementAsync(id.ToString(), "deleteWith", 1);
            }

            return await _fileService.Get(id, hashEntries[1].Value, hashEntries[2].Value);
        }
    }
}
