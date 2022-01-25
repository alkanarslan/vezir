namespace vezir.api.RequestModel;

public class RefreshTokenRequest
{
    public int UserId { get; set; }
    public string RefreshToken { get; set; }

}