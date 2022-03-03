using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using vezir.api.Helper;
using vezir.api.Hubs;
using vezir.api.Interface;

namespace vezir.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeclarationsController : ControllerBase
    {
        private readonly IDeclarationsService _declarationsService;
        private readonly IUriService _uriService;
        private readonly IHubContext<DeclarationHub> _declarationsHub;
        public DeclarationsController(IDeclarationsService declarationsService, IUriService uriService, IHubContext<DeclarationHub> declarationsHub)
        {
            _declarationsService = declarationsService;
            this._uriService = uriService;
            _declarationsHub = declarationsHub;
        }
        [HttpGet]
        public async Task<IActionResult> AllDeclarations([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
         
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var pagedData = await _declarationsService.DeclarationsFilterListAsync(validFilter);
            var totalRecords = await _declarationsService.GetCountAsync();
            //Console.WriteLine(totalRecords);
            //await _declarationsHub.Clients.All.SendAsync("Kamil",validFilter);
            var pagedReponse = PaginationHelper.CreatePagedReponse(pagedData, validFilter, totalRecords, _uriService,route);

            return Ok(pagedReponse);
        }
        
        
      
        [HttpPost(Name = "Signaldeneme")]
        public async Task<IActionResult> All2Declarations(string id)
        {
            await _declarationsHub.Clients.All.SendAsync("SendMessage",id);
            return Ok();
        }

    }
}