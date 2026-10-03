namespace StoryConnectBackend.Email;

public sealed class ConsoleEmailSender : IEmailSender
{
    public Task SendAsync(string to, string subject, string body, CancellationToken cancellationToken)
    {
        Console.WriteLine($"[Email] To: {to} | Subject: {subject} | Body: {body}");
        return Task.CompletedTask;
    }
}
