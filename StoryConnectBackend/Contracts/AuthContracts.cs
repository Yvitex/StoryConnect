using System.ComponentModel.DataAnnotations;

namespace StoryConnectBackend.Contracts;

public sealed record RegisterRequest(
    [Required, EmailAddress, MaxLength(256)] string Email,
    [Required, StringLength(32, MinimumLength = 3)] string Username,
    [Required, MaxLength(128)] string Password);

public sealed record RegisterResponse(string Message);

public sealed record MeResponse(string Id, string? Username);

public sealed record LoginRequest(
    [Required, EmailAddress, MaxLength(256)] string Email, 
    [Required, MaxLength(128)] string Password
);

public sealed record TokenResponse(
    string AccessToken,
    string TokenType,
    int ExpiresIn
);





