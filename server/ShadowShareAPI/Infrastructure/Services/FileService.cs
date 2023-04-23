namespace ShadowShareAPI.Infrastructure.Services;

public interface IFileService
{
    Task Save(Guid id,IFormFile formFile);
    Task<Core.Data.Models.File> Get();
}

public class FileService : IFileService
{
    private readonly string _storageLocation;

    public FileService(IConfiguration configuration)
    {
        _storageLocation = configuration.GetValue<string>("StorageLocation");

        if (!Directory.Exists(_storageLocation))
        {
            Directory.CreateDirectory(_storageLocation);
        }
    }

    async Task IFileService.Save(Guid id, IFormFile formFile)
    {
        FileStream stream = new FileStream(Path.Combine(_storageLocation, id.ToString() + Path.GetExtension(formFile.FileName)),FileMode.Create);
        await formFile.CopyToAsync(stream);
    }

    async Task<Core.Data.Models.File> IFileService.Get()
    {
        throw new NotImplementedException();
    }
}
