using Microsoft.Extensions.Configuration;
using StackExchange.Redis;

namespace ShadowShareAPI.Infrastructure.Data;

public class RedisContext
{
    private readonly IConfiguration _configuration;
    private readonly ConnectionMultiplexer _redis;

    public RedisContext(IConfiguration configuration)
    {
        _configuration = configuration;
        _redis = ConnectionMultiplexer.Connect(_configuration.GetConnectionString("Redis"));
    }

    public IDatabase GetDatabase()
    {
        return _redis.GetDatabase();
    }
}
