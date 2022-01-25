using vezir.api.RequestModel;
using vezir.api.ResponseModel;

namespace vezir.api.Interface;

public interface IUserService
{
    Task<TokenResponse> LoginAsync(LoginRequest loginRequest);
    Task<SignupResponse> SignupAsync(SignupRequest signupRequest);
    Task<LogoutResponse> LogoutAsync(int userId);
}