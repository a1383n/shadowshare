using ShadowShareAPI.Infrastructure.Data;
using ShadowShareAPI.Infrastructure.Data.Repository;
using ShadowShareAPI.Infrastructure.Services;

namespace ShadowShareAPI;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Register RedisContext as a singleton service
        services.AddSingleton(new RedisContext(_configuration));

        services.AddSingleton<IFileService, FileService>();
        services.AddSingleton<IFileRepository, FileRepository>();

    }
}
