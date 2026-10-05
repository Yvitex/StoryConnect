using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace StoryConnectBackend.Auth;


public sealed class JwtSigningKey : IDisposable
{

    private readonly ECDsa _ecdsa;
    public const string Algorithm = SecurityAlgorithms.EcdsaSha256;

    public JwtSigningKey(IOptions<JwtOptions> options)
    {
        _ecdsa = ECDsa.Create();
        _ecdsa.ImportFromPem(options.Value.SigningKeyPem);
        var parameters = _ecdsa.ExportParameters(false);

        if (_ecdsa.KeySize != 256 || parameters.Curve.Oid.Value != ECCurve.NamedCurves.nistP256.Oid.Value)
        {
            _ecdsa.Dispose();
            throw new InvalidOperationException("Jwt:SigningKeyPem must be an ECDSA P-256 key (ES256).");
        }

        Key = new ECDsaSecurityKey(_ecdsa)
        {
            KeyId = ComputeKeyId(_ecdsa)
        };

        Credentials = new SigningCredentials(Key, Algorithm);

    }

    public ECDsaSecurityKey Key {get;}
    public SigningCredentials Credentials {get;}


    private static string ComputeKeyId(ECDsa eCDsa)
    {
        var publicKey = eCDsa.ExportSubjectPublicKeyInfo();
        var hashedPublicKey = SHA256.HashData(publicKey);
        var encryptedHasedPublicKey = Base64UrlEncoder.Encode(hashedPublicKey)[..16];
        return encryptedHasedPublicKey;
    }
 


    public void Dispose()
    {
        _ecdsa.Dispose();
    }
}