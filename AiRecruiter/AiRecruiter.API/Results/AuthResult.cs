namespace AiRecruiter.API.Results;

public class AuthResult
{
    public string Token { get; set; }
    public string RefreshToken { get; set; }
    public DateTime ExpiresAt { get; set; }
    public string Role { get; set; }
}