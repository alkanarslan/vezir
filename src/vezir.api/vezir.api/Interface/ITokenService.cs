using vezir.api.Model;
using vezir.api.RequestModel;
using vezir.api.ResponseModel;

namespace vezir.api.Interface;

public interface ITokenService
{
    Task<Tuple<string, string>> GenerateTokensAsync(int userId);
    Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(RefreshTokenRequest refreshTokenRequest);
    Task<bool> RemoveRefreshTokenAsync(User user);
}