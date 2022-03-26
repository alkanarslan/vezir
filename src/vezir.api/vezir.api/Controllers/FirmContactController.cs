
using Microsoft.AspNetCore.Mvc;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers;

[ApiController]
public class FirmContactController : BaseApiController
{
    private readonly IFirmContactService _firmContactService;

    public FirmContactController(IFirmContactService firmContactService)
    {
        _firmContactService = firmContactService;
    }

    [HttpGet]
    [Route("api/firmcontact")]
    public async Task<IActionResult> FirmContact(int firmId)
    {
     var result =    await _firmContactService.FindAsync(p => p.CurrentAccountId == firmId);
        
        return Ok(result);
    }
    [HttpPost]
    [Route("api/firmcontact")]
    public async Task<IActionResult> FirmContactAdd(FirmContact firmContact)
    {
        firmContact.CreateDate = DateTime.Now; 
        _firmContactService.AddAsync(firmContact);
        await _firmContactService.SaveChangesAsync();
        return Ok(firmContact);
    }
}