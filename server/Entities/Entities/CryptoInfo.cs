using Microsoft.VisualBasic;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace Entities;

public class CryptoInfo
{
    [JsonIgnore]
    private byte[]? Key { get; set; }
    public byte[] Iv { get; set; }
    public byte[] Salt { get; set; }

    public static CryptoInfo Create(string password,int keySize = 256, int blockSize = 128, int iteration = 10_000)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(blockSize / 8);
        using Rfc2898DeriveBytes deriveBytes = new(password, salt, iteration, HashAlgorithmName.SHA256);

        using Aes aes = Aes.Create();
        aes.KeySize = keySize;
        aes.BlockSize = blockSize;
        aes.Key = deriveBytes.GetBytes(keySize / 8);
        aes.GenerateIV();

        return new CryptoInfo
        {
            Key = aes.Key,
            Iv = aes.IV,
            Salt = salt,
        };
    }

    public void SetPassword(string password, int keySize = 256, int blockSize = 128, int iteration = 10_000)
    {
        using Rfc2898DeriveBytes deriveBytes = new(password, Salt, iteration, HashAlgorithmName.SHA256);
        Key = deriveBytes.GetBytes(keySize / 8);
    }

    public Aes GetAes(int keySize = 256,int blockSize = 128)
    {
        if (Key != null)
        {
            Aes aes = Aes.Create();
            aes.KeySize = keySize;
            aes.BlockSize = blockSize;
            aes.Key = Key;
            aes.IV = Iv;

            return aes;
        }else
        {
            throw new Exception("Key not provided");
        }
    }
}
