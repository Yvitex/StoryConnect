using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace StoryConnectBackend.Auth;

public sealed record AccessToken(string Value, DateTimeOffset ExpiresAt);


public sealed class AccessTokenIssuer(IOptions<JwtOptions> options, JwtSigningKey signingKey, TimeProvider timeProvider)
{
    private static readonly JsonWebTokenHandler handler = new();

    public AccessToken Issue(IdentityUser user) 
    {
        var jwt = options.Value;
        var now = timeProvider.GetUtcNow();
        var expiresAt = now.Add(jwt.AccessTokenLifetime);

        var descriptor = new SecurityTokenDescriptor
        {
          Issuer = jwt.Issuer,
          Audience = jwt.Audience,
          IssuedAt = now.UtcDateTime,
          NotBefore = now.UtcDateTime,
          Expires = expiresAt.UtcDateTime,
          TokenType =   JwtTokenValidation.AccessTokenType,
          SigningCredentials = signingKey.Credentials,
          Subject = new ClaimsIdentity([
              new Claim(JwtRegisteredClaimNames.Sub, user.Id),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
              new Claim(JwtRegisteredClaimNames.Name, user.UserName ?? string.Empty)
          ])
        };


        return new AccessToken(handler.CreateToken(descriptor), expiresAt);
    }

}