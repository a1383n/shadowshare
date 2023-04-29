namespace ShadowShareAPI.Dto;

using Microsoft.AspNetCore.Http;
using ShadowShareAPI.Utils;
using System.ComponentModel.DataAnnotations;

public class FileCollectionDto
{
    [Required(ErrorMessage = "Please select at least one file.")]
    [FileValidation(MaxOverallFileSize = 10 * 1024 * 1024)]
    public IFormFileCollection Files { get; set; }

    [StringLength(32, MinimumLength = 4)]
    public string? Password { get; set; }

    [Required]
    [RegularExpression(@"^(?:[1-7]d|(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-3])h|(?:[1-9]|[1-5][0-9])m)$")]
    public string DeleteAfter { get; set; }

    [Required]
    [Range(1, 1000)]
    public uint DeleteWithDownloadCount { get; set; }

    [StringLength(256, MinimumLength = 4)]
    public string? Description { get; set; }

    public TimeSpan GetDeleteAfter()
    {
        int value = int.Parse(DeleteAfter.Remove(DeleteAfter.Length - 1));
        return DeleteAfter.Last() switch
        {
            'd' => TimeSpan.FromDays(value),
            'h' => TimeSpan.FromHours(value),
            'm' => TimeSpan.FromMinutes(value),
            _ => throw new Exception("Unexpected state"),
        };
    }
}
