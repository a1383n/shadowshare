using StackExchange.Redis;

namespace Data;

public class ApplicationDatabaseContext
{
    private readonly ConnectionMultiplexer _connectionMultiplexer;

    public ApplicationDatabaseContext(string connectionString)
    {
        _connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    }

    public IDatabase GetDatabase(int database = -1)
    {
        return _connectionMultiplexer.GetDatabase(database);
    }
}
