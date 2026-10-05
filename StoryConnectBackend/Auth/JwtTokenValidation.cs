using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace StoryConnectBackend.Auth;

public static class JwtTokenValidation
{
    public static string AccessTokenType = "at+jwt";


    public static TokenValidationParameters Create(JwtOptions options, SecurityKey signingKey) => new()
    {
        ValidIssuer = options.Issuer,
        ValidateIssuer = true,
        ValidAudience = options.Audience,
        ValidateAudience = true,
        IssuerSigningKey = signingKey,
        ValidateIssuerSigningKey = true,
        ValidAlgorithms = [JwtSigningKey.Algorithm],
        ValidTypes = [AccessTokenType],

        ValidateLifetime = true,
        RequireExpirationTime = true,
        ClockSkew = TimeSpan.FromSeconds(30),

        NameClaimType = JwtRegisteredClaimNames.Name,
        RoleClaimType = "role",
        RequireSignedTokens = true

    };
 }