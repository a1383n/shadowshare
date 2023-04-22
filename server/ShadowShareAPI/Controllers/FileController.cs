using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controller;

[ApiController]
[Route("api/file/")]
public class FileController
{
    public FileController()
    {

    }

    [HttpPost]
    public ActionResult Upload([FromForm] FileFormData fileForm)
    {
        return new OkResult();
    }
}
