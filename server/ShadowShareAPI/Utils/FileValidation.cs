using System.ComponentModel.DataAnnotations;

namespace ShadowShareAPI.Utils;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]
public class FileValidation : ValidationAttribute
{
    public long MaxOverallFileSize { get; set; }

    private static bool IsFormFileValid(IFormFile file)
    {
        return file != null && file.Length > 0;
    }

    private static bool IsFormFileCollectionValid(IFormFileCollection files)
    {
        return files != null && files.Count > 0 && files.All(file => IsFormFileValid(file));
    }

    private static bool IsValidFiles(object value)
    {
        if (value is IFormFileCollection collection)
        {
            return IsFormFileCollectionValid(collection);
        }
        else if (value is IFormFile formFile)
        {
            return IsFormFileValid(formFile);
        }else
        {
            return false;
        }
    }

    private bool ValidateFileSize(object value)
    {
        long overallSize = 0;
        if (value is IFormFileCollection collection)
        {
            foreach (IFormFile file in collection)
            {
                overallSize += file.Length;

                if (overallSize > MaxOverallFileSize)
                    return false;
            }

            return true;
        }
        else
        {
            return value is IFormFile file && file.Length <= MaxOverallFileSize;
        }
    }

    public override bool IsValid(object? value)
    {
        if (value == null)
            return false;

        if (!IsValidFiles(value!))
            return false;

        if (MaxOverallFileSize > 0)
        {
            if (!ValidateFileSize(value!))
            {
                return false;
            }
        }

        return true;
    }
}
