using Data.Contracts;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using ShadowShareAPI.Core;
using ShadowShareAPI.Dto;
using System.Security.Cryptography;

namespace ShadowShareAPI.Controller;

[ApiController]
[Route("api/file/")]
public class FileController : Microsoft.AspNetCore.Mvc.Controller
{
    private readonly IFileRepository _repository;
    private readonly IFileService _service;

    public FileController(IFileRepository repository, IFileService service)
    {
        _repository = repository;
        _service = service;
    }

    [HttpPost]
    public IActionResult Upload([FromForm] FileCollectionDto fileForm)
    {
        var files = FileInfoDto.FromFileCollection(fileForm.Files);
        var fileCollection = new FileCollection
        {
            ExpireAt = fileForm.GetDeleteAfter(),
            MaximumDownloadCount = fileForm.DeleteWithDownloadCount,
            Description = fileForm.Description,
            IsEncrypted = fileForm.Password != null,
            Files = files.Select(f => f.FileInfo).ToList()
        };

        if (fileCollection.IsEncrypted)
        {
            fileCollection.CryptoInfo = _service.GenerateCryptoInfo(fileForm.Password!);
            files.ForEach((i) => files.ForEach((i) => _service.WriteEncryptedFileAsync(i.Stream,fileCollection.Id, i.FileInfo.Id, fileCollection.CryptoInfo)));
        }
        else
        {
            files.ForEach((i) => files.ForEach((i) => _service.WriteFileAsync(i.Stream,fileCollection.Id, i.FileInfo.Id)));
        }

        _repository.SetAsync(fileCollection);

        return ApiResult<Dictionary<string, object>>.Created(new Dictionary<string, object>
        {
            { "id", fileCollection.Id }
        });
    }

    [HttpPost("{id}/{fileId}")]
    public IActionResult Download(Guid id, Guid fileId, [FromForm] string? password)
    {
        var result = _repository.Get(id.ToString());
        if (result != null)
        {
            var fileInfo = result.Files.Find((i) => i.Id == fileId);
            if (fileInfo != null)
            {
                if (fileInfo.DownloadCount < result.MaximumDownloadCount)
                {
                    if (result.IsEncrypted)
                    {
                        if (password != null)
                        {
                            result.CryptoInfo!.SetPassword(password);
                            using var cryptoStream = _service.ReadEncryptedFile(result.Id, fileInfo.Id, result.CryptoInfo!);
                            var memoryStream = new MemoryStream();

                            try
                            {
                                cryptoStream.CopyTo(memoryStream);
                                memoryStream.Position = 0;
                                if (_service.GetFileHash(memoryStream) == fileInfo.Hash)
                                {
                                    _repository.IncrementDownloadCountAsync(result.Id, fileInfo.Id);
                                    memoryStream.Position = 0;
                                    return File(memoryStream, fileInfo.ContentType, fileInfo.Name, true);
                                }
                                else
                                {
                                    return ApiResult.BadRequest("Invalid password");
                                }
                            }
                            catch (CryptographicException)
                            {
                                return ApiResult.BadRequest("Invalid password");
                            }
                        }
                        else
                        {
                            return ApiResult.BadRequest("Password not provided.");
                        }
                    }
                    else
                    {
                        _repository.IncrementDownloadCountAsync(result.Id, fileInfo.Id);
                        return File(_service.ReadFile(result.Id, fileId), fileInfo.ContentType, fileInfo.Name, true);
                    }
                }else
                {
                    return ApiResult.BadRequest("Maximum download count was reached");
                }
            }
            else
            {
                return ApiResult.NotFound();
            }
        }
        else
        {
            return ApiResult.NotFound();
        }
    }

    [HttpGet("{id}/info")]
    public IActionResult GetCollectionInfo(Guid id)
    {
        var result = _repository.Get(id.ToString());
        if (result != null)
        {
            if (result.IsEncrypted)
            {
                result.CryptoInfo = null;
            }

            return ApiResult<FileCollection>.Ok(result);
        }
        else
        {
            return ApiResult.NotFound();
        }
    }
}
