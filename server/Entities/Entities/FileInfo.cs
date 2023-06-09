﻿namespace Entities;
public class FileInfo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public uint DownloadCount { get; set; } = 0;
    public string ContentType { get; set; }
    public long Size { get; set; }
    public string Hash { get; set; }
}