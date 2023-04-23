namespace ShadowShareAPI.Infrastructure.Services;

public interface IFileService
{
    Task Save(Guid id,IFormFile formFile);
    Task<Core.Data.Models.File?> Get(Guid id, string fileName, string contentType);
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
        FileStream stream = new FileStream(Path.Combine(_storageLocation, id.ToString() + Path.GetExtension(formFile.FileName)),FileMode.CreateNew,FileAccess.Write,FileShare.Write);
        await formFile.CopyToAsync(stream);
        stream.Dispose();
    }

    async Task<Core.Data.Models.File?> IFileService.Get(Guid id,string fileName, string contentType)
    {
        string extention = Path.GetExtension(fileName);
        string filePath = Path.Combine(_storageLocation, id.ToString() + extention);

        if (File.Exists(filePath))
        {
            return new Core.Data.Models.File(id, new FileStream(filePath, FileMode.Open,FileAccess.Read,FileShare.Read), fileName,contentType);
        }
        else
        {
            return null;
        }
    }
}
