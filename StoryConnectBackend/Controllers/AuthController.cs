using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using StoryConnectBackend.Contracts.Auth;
using StoryConnectBackend.Email;

namespace StoryConnectBackend.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    UserManager<IdentityUser> userManager,
    IEmailSender emailSender,
    ILogger<AuthController> logger) : ControllerBase
{
    [EnableRateLimiting("register")]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request, CancellationToken cancellationToken)
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
}
