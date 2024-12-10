using CleanerService.Utils;
using StackExchange.Redis;

#region Setup Environments

var connectionString = Environment.GetEnvironmentVariable("REDIS_CONNECTION_STRING") ?? "127.0.0.1:6379";
var storageLocation = Environment.GetEnvironmentVariable("STORAGE_LOCATION") ?? @"/mnt/storage";

var timerInterval = args.Length <= 1 ? null ?? "00:10:00" : args[0]; // Every 10m

Console.WriteLine("Service started");

#endregion

#region Setup Redis connection

IDatabase database;
ISubscriber subscriber;

try
{
    var connectionMultiplexer = ConnectionMultiplexer.Connect(connectionString);
    database = connectionMultiplexer.GetDatabase();
    subscriber = connectionMultiplexer.GetSubscriber();
    MyConsole.WriteLineColor($"Connected to {connectionMultiplexer} at {connectionString}", ConsoleColor.Green);
}
catch (RedisException e)
{
    MyConsole.WriteLineColor($"Error: {e.Message}", ConsoleColor.Red);
    return;
}
#endregion

#region Listen for expiration
// Redis notify-keyspace-events should be set to 'Ex'
subscriber.Subscribe(new RedisChannel("__keyevent@0__:expired", RedisChannel.PatternMode.Literal), (channel, key) =>
{
    Console.WriteLine($"{key} was expired");
    Directory.Delete(Path.Combine(storageLocation, key.ToString()), true);
});
#endregion

#region Setup Timer for auto clean
System.Timers.Timer timer = new System.Timers.Timer(TimeSpan.Parse(timerInterval).TotalMilliseconds);
timer.Elapsed += (sender, e) =>
{
    int i = 0;
    MyConsole.WriteLineColor($"\tAuto cleaner execute at {e.SignalTime}", ConsoleColor.Blue);
    string[] paths = Directory.GetDirectories(storageLocation).Union(Directory.GetFiles(storageLocation)).ToArray();

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