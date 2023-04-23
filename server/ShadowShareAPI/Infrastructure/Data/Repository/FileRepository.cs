using ShadowShareAPI.Core.Data.Base;
using ShadowShareAPI.Core.Data.FormData;
using ShadowShareAPI.Infrastructure.Services;
using StackExchange.Redis;
using System.Data.SqlTypes;
using System.Text.Json.Nodes;

namespace ShadowShareAPI.Infrastructure.Data.Repository;

public interface IFileRepository
{
    public Task<Guid> Save(FileFormData fileFormData);
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

    private HashEntry[] getHashEntries(uint deleteWith)
    {
        return new HashEntry[]
        {
            new HashEntry("deleteWith",deleteWith),
        };
    }


    async Task<Guid> IFileRepository.Save(FileFormData fileFormData)
    {
        Guid id = Guid.NewGuid();

        Task task1 = Task.Run(async () => {
            await _database.HashSetAsync(id.ToString(), getHashEntries(fileFormData.DeleteWithDownloadCount));
            await _database.KeyExpireAsync(id.ToString(), fileFormData.DeleteAfterToDateTime());
        });

        await Task.WhenAll(task1,_fileService.Save(id,fileFormData.File));

        return id;
    }
}
