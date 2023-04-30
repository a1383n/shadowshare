using CleanerService.Utils;
using StackExchange.Redis;

#region Setup Environments

string _connectionString = Environment.GetEnvironmentVariable("REDIS_CONNECTION_STRING") ?? "127.0.0.1:6379";
string _storageLocation = Environment.GetEnvironmentVariable("STORAGE_LOCATION") ?? @"C:\Users\amirs\Desktop\UUU";

string _timerInterval = args.Length <= 1 ? null ?? "00:10:00" : args[0]; // Every 10m

Console.WriteLine("Service started");

#endregion

#region Setup Redis connection

ConnectionMultiplexer connectionMultiplexer;
IDatabase database;
ISubscriber subscriber;

try
{
    connectionMultiplexer = ConnectionMultiplexer.Connect(_connectionString);
    database = connectionMultiplexer.GetDatabase();
    subscriber = connectionMultiplexer.GetSubscriber();
    MyConsole.WriteLineColor($"Connected to {connectionMultiplexer} at {_connectionString}", ConsoleColor.Green);
}
catch (RedisException e)
{
    MyConsole.WriteLineColor($"Error: {e.Message}", ConsoleColor.Red);
    return;
}
#endregion

#region Listen for expiration
// Redis notify-keyspace-events should be set to 'Ex'
subscriber.Subscribe("__keyevent@0__:expired", (channel, key) =>
{
    Console.WriteLine($"{key} was expired");
    Directory.Delete(Path.Combine(_storageLocation, key.ToString()), true);
});
#endregion

#region Setup Timer for auto clean
System.Timers.Timer timer = new System.Timers.Timer(TimeSpan.Parse(_timerInterval).TotalMilliseconds);
timer.Elapsed += (sender, e) =>
{
    int i = 0;
    MyConsole.WriteLineColor($"\tAuto cleaner execute at {e.SignalTime}", ConsoleColor.Blue);
    string[] paths = Directory.GetDirectories(_storageLocation).Union(Directory.GetFiles(_storageLocation)).ToArray();

    foreach (string path in paths)
    {
        string name = Path.GetFileName(path);
        if (!database.KeyExists(name))
        {
            i++;
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            else
            {
                Directory.Delete(path, true);
            }
            Console.WriteLine($"\t\t{name} Removed");
        }
    }
    Console.WriteLine($"\t{i} item was removed");
};
timer.AutoReset = true;
timer.Enabled = true;
timer.Start();
#endregion

#region Wait for termination signal
var terminationEvent = new ManualResetEvent(false);
Console.CancelKeyPress += (sender, eventArgs) =>
{
    eventArgs.Cancel = true;
    terminationEvent.Set();
};
terminationEvent.WaitOne();
#endregion