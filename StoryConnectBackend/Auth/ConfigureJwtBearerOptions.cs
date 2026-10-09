using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;

namespace StoryConnectBackend.Auth;


public sealed class ConfigureJwtBearerOptions(IOptions<JwtOptions> jwtOptions, JwtSigningKey signingKey) : IConfigureNamedOptions<JwtBearerOptions>
{
    public void Configure(string? name, JwtBearerOptions options)
    {
        if (name != JwtBearerDefaults.AuthenticationScheme)
        {
            return;
        }

        options.MapInboundClaims = false;
        options.TokenValidationParameters = JwtTokenValidation.Create(jwtOptions.Value, signingKey.Key);

    }

    public void Configure(JwtBearerOptions options)
    {
        Configure(Options.DefaultName, options);
    }
}