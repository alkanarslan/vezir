namespace vezir.api.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

public class BaseApiController : ControllerBase
{
    protected int UserId => int.Parse(FindClaim(ClaimTypes.NameIdentifier) ?? string.Empty);
    private string? FindClaim(string claimName)
    {
        var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
        var claim = claimsIdentity?.FindFirst(claimName);
 
        return claim?.Value;
    }
}