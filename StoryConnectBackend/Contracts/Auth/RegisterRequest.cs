using System.ComponentModel.DataAnnotations;

namespace StoryConnectBackend.Contracts.Auth;

public record RegisterRequest(
    [Required, EmailAddress, MaxLength(256)] string Email,
    [Required, StringLength(32, MinimumLength = 3)] string Username,
    [Required, MaxLength(128)] string Password);
