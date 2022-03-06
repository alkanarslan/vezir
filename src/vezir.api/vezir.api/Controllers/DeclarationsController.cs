using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using vezir.api.Helper;
using vezir.api.Hubs;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers
{
    [ApiController]
    public class DeclarationsController : ControllerBase
    {
        private readonly IDeclarationsService _declarationsService;
        private readonly IFirmDeclarationsService _firmDeclarationsService;
        private readonly ICurrentAccount _currentAccount;
        private readonly IUriService _uriService;
        private readonly IHubContext<DeclarationHub> _declarationsHub;

        public DeclarationsController(IDeclarationsService declarationsService, IUriService uriService,
            IHubContext<DeclarationHub> declarationsHub, IFirmDeclarationsService firmDeclarationsService,
            ICurrentAccount currentAccount)
        {
            _declarationsService = declarationsService;
            _uriService = uriService;
            _declarationsHub = declarationsHub;
            _firmDeclarationsService = firmDeclarationsService;
            _currentAccount = currentAccount;
        }

        [HttpGet]
        [Route("api/Declarations")]
        public async Task<IActionResult> AllDeclarations([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;

            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var pagedData = await _declarationsService.DeclarationsFilterListAsync(validFilter);
            var totalRecords = await _declarationsService.GetCountAsync();
            var pagedReponse =
                PaginationHelper.CreatePagedReponse(pagedData, validFilter, totalRecords, _uriService, route);

            return Ok(pagedReponse);
        }


        [Route("api/Declarations/Signaldeneme")]
        [HttpGet]
        public async Task<IActionResult> All2Declarations(string id)
        {
            await _declarationsHub.Clients.All.SendAsync("SendMessage", id);
            return Ok();
        }


        [Route("api/declarations/firm-assign")]
        [HttpPost]
        public async Task<IActionResult> DeclarationsFirmAssing(int firmId, List<int> declarationSelectId)
        {
            var firmItem = await _currentAccount.GetCurrentAccount(firmId);

            if (firmItem != null)
            {
                foreach (var itemDeclarations in declarationSelectId)
                {
                    #region bunlar eklenmişmi diye bakabilirsin yada bak

                    #endregion

                    _firmDeclarationsService.AddAsync(new FirmDeclarations
                    {
                        FirmId = firmItem.Id,
                        CreateDate = DateTime.Now,
                        DeclarationsId = itemDeclarations
                    });
                }

                await _firmDeclarationsService.SaveChangesAsync();
            }
            else
            {
                return BadRequest("Boyle bir firma kayıtlı değil");
            }

            return Ok("Ok");
        }
    }
}