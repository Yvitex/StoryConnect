using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StoryConnectBackend.Auth;
using StoryConnectBackend.Contracts;
using StoryConnectBackend.Email;

namespace StoryConnectBackend.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    UserManager<IdentityUser> userManager,
    IEmailSender emailSender,
    ILogger<AuthController> logger,
    SignInManager<IdentityUser> signInManager,
    AccessTokenIssuer accessTokenIssuer
    ) : ControllerBase

{
    [AllowAnonymous]
    [EnableRateLimiting("register")]
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterRequest request, CancellationToken cancellationToken)
    {
        var response = new RegisterResponse("If that email can be registered, we've sent a confirmation link.");

        var user = new IdentityUser { UserName = request.Username, Email = request.Email };
        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            logger.LogInformation(
                "Register attempt failed: {Errors}",
                string.Join(", ", result.Errors.Select(e => e.Code)));

            return Accepted(response);
        }

        var token = await userManager.GenerateEmailConfirmationTokenAsync(user);

        await emailSender.SendAsync(
            request.Email,
            "Confirm your email",
            $"Your authentication token is {token}",
            cancellationToken);

        return Accepted(response);
    }


    [AllowAnonymous]
    [EnableRateLimiting("strict")]
    [HttpPost("login")]
    public async Task<ActionResult<TokenResponse>> Login(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        
        if (user is null)
        {
            return InvalidCredentials();
        }

        var result = await signInManager.CheckPasswordSignInAsync(user, request.Password, lockoutOnFailure: true);

        if (!result.Succeeded)
        {
            logger.LogInformation(
                "Login failed for user {UserId}: lockedOut={IsLockedOut}, notAllowed={IsNotAllowed}",
                user.Id, result.IsLockedOut, result.IsNotAllowed);
            
            return InvalidCredentials();
        }

        return Ok(CreateTokenResponse(user));

    }



    [Authorize]
    [HttpGet("me")]
    public ActionResult<MeResponse> Me()
    {
        return new MeResponse(User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? string.Empty, User.Identity?.Name);
    }



    private TokenResponse CreateTokenResponse(IdentityUser user)
    {
        var accessToken = accessTokenIssuer.Issue(user);
        var expiresAt = (int) (accessToken.ExpiresAt - DateTimeOffset.UtcNow).TotalSeconds;
        var tokenType = "Bearer";

        return new TokenResponse(accessToken.Value, tokenType, expiresAt);
    }


    private ObjectResult InvalidCredentials() => Problem(statusCode: StatusCodes.Status401Unauthorized, title: "Invalid Credentials");
}
