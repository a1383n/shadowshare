using Microsoft.AspNetCore.Mvc;
using ShadowShareAPI.Core.Data.FormData;
using ShadowShareAPI.Infrastructure.Data.Repository;

namespace server.Controller;

[ApiController]
[Route("api/file/")]
public class FileController
{
    private readonly IFileRepository _fileRepository;

    public FileController(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    [HttpPost]
    public string Upload([FromForm] FileFormData fileForm)
    {
        return _fileRepository.Save(fileForm).Result.ToString();
    }
}
