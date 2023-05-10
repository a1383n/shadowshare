using Data;

namespace ShadowShareAPI;

public class Startup
{
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        string connectionString = Configuration.GetConnectionString("DefaultConnection");
        string defaultStorageLocation = Configuration.GetValue("StorageLocation","/mnt/storage");

        services.AddSingleton(new ApplicationDatabaseContext(connectionString));
        services.AddSingleton<Data.Contracts.IFileRepository, Data.Repositories.FileRepository>();
        services.AddSingleton<Services.IFileService>(new Services.FileService(defaultStorageLocation));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            // Configure error handling for other environments
            // For example: app.UseExceptionHandler("/Home/Error");
        }

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}
