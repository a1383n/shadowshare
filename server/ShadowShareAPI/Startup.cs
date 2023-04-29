using Data;

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
        services.AddSingleton(new ApplicationDatabaseContext(_configuration.GetConnectionString("Redis")));
        services.AddSingleton<Data.Contracts.IFileRepository, Data.Repositories.FileRepository>();
        services.AddSingleton<Services.IFileService>(new Services.FileService(_configuration.GetValue<string>("StorageLocation")));
    }
}
