namespace ShadowShareAPI.Core.Data.FormData;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Http;
using server.Utils;

public class FileFormData
{
    [Required(ErrorMessage = "Please select at least one file.")]
    [MaxFileSize(100 * 1024, ErrorMessage = "The file or total size of files is too big.")]
    public IFormFile File { get; set; }

    [StringLength(32, MinimumLength = 4, ErrorMessage = "The password must be between 4 and 32 characters long.")]
    public string? Password { get; set; }

    [Required]
    [RegularExpression(@"^(?:[1-7]d|(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-3])h|(?:[1-9]|[1-5][0-9])m)$", ErrorMessage = "The expiration time must be in the correct format.")]
    public string DeleteAfter { get; set; }

    [Required]
    [Range(1, 1000, ErrorMessage = "The number of downloads must be between 1 and 1000.")]
    public uint DeleteWithDownloadCount { get; set; }

    public DateTime DeleteAfterToDateTime()
    {
        DateTime now = DateTime.Now;
        char intervalPostfix = DeleteAfter.Last();
        int value = int.Parse(DeleteAfter.Remove(DeleteAfter.Length - 1));

        switch (DeleteAfter.Last())
        {
            case 'd':
                return now.AddDays(value);
            case 'h':
                return now.AddHours(value);
            case 'm':
                return now.AddMinutes(value);
            default:
                throw new Exception("Unexptected state");
        }
    }
}
