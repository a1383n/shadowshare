using System.ComponentModel.DataAnnotations;

namespace server.Utils;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
public class MaxFileSizeAttribute : ValidationAttribute
{
    private readonly int _maxFileSize;
    private long _overallSizes;

    public MaxFileSizeAttribute(int maxFileSize)
    {
        _maxFileSize = maxFileSize;
    }

    public override bool IsValid(object? value)
    {
        if (value is IFormFileCollection)
        {
            foreach (IFormFile file in (IFormFileCollection) value)
            {
                _overallSizes += file.Length;
                
                if (_overallSizes > _maxFileSize)
                    return false;
            }

            return true;
        }
        else if (value is IFormFile)
        {
            return ((IFormFile) value).Length <= _maxFileSize;
        }
        else
        {
            return false;
        }
    }
}
