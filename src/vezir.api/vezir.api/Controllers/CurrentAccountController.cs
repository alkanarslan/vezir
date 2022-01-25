using Microsoft.AspNetCore.Mvc;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers;


[Route("api/[controller]")]
[ApiController]
public class CurrentAccountController : Controller
{
    private readonly ICurrentAccount _currentAccount;

    public CurrentAccountController(ICurrentAccount currentAccount)
    {
        _currentAccount = currentAccount;
    }
    [HttpGet]
    public async Task<IActionResult> Get(int currentAccountId)
    {
        var getTasksResponse = await _currentAccount.GetCurrentAccount(currentAccountId);
        return Ok(getTasksResponse);
    }

    [HttpPost]
    public async Task<IActionResult> Post(CurrentAccount currentAccount )
    {
      currentAccount.CreateDate = DateTime.Now;
        var saveTaskResponse = await _currentAccount.SetCurrentAccount(currentAccount);
        return Ok(saveTaskResponse);
    }

   
}