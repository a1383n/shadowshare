using Microsoft.AspNetCore.Mvc;
using ShadowShareAPI.Core.Data.FormData;
using ShadowShareAPI.Infrastructure.Data.Repository;

namespace ShadowShareAPI.Controller;

[ApiController]
[Route("api/file/")]
public class FileController : Microsoft.AspNetCore.Mvc.Controller
{
    private readonly IFileRepository _fileRepository;

    public FileController(IFileRepository fileRepository)
    {
        _fileRepository = fileRepository;
    }

    [HttpPost]
    public IActionResult Upload([FromForm] FileFormData fileForm)
    {
        return Ok(_fileRepository.Save(fileForm).Result);
    }

    [HttpGet("{id}")]
    public IActionResult Download(Guid id)
    {
        Core.Data.Models.File? file = _fileRepository.GetFile(id).Result;
        return file != null ? File(file.Stream, file.ContentType, file.FileName, true) : NotFound();
    }
}
