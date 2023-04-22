namespace server.Models;

using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using server.Utils;

public class FileFormData
{
    [Required(ErrorMessage = "Please select at least one file.")]
    [MaxFileSize(100 * 1024,ErrorMessage = "The file or total size of files is too big.")]
    public IFormFileCollection Files { get; set; }
    
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",ErrorMessage = "The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.")]
    [StringLength(32, MinimumLength = 4, ErrorMessage = "The password must be between 4 and 32 characters long.")]
    public string? Password { get; set; }
    
    [RegularExpression(@"^([1-7]d|2[0-3]h|[0-5]?\d{1}m)$", ErrorMessage = "The expiration time must be in the correct format.")]
    public string? ExpireAfterTime { get; set; }
    
    [Range(1, 1000, ErrorMessage = "The number of downloads must be between 1 and 1000.")]
    public uint? ExpireAfterDownloadCount { get; set; } = 5;
}
