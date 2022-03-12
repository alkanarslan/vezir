using System.Security.AccessControl;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using vezir.api.Helper;
using vezir.api.Hubs;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers
{
    [ApiController]
    public class DeclarationsController : BaseApiController
    {
        private readonly IDeclarationsService _declarationsService;
        private readonly IFirmDeclarationsService _firmDeclarationsService;
        private readonly IPlanningDeclarationsService _planningDeclarationsService;
        private readonly IPlanningDeclarationsVerificationService _planningDeclarationsVerificationService;
        private readonly ICurrentAccount _currentAccount;
        private readonly IUriService _uriService;
        private readonly IHubContext<DeclarationHub> _declarationsHub;

        public DeclarationsController(IDeclarationsService declarationsService, IUriService uriService,
            IHubContext<DeclarationHub> declarationsHub, IFirmDeclarationsService firmDeclarationsService,
            ICurrentAccount currentAccount, IPlanningDeclarationsService planningDeclarationsService, IPlanningDeclarationsVerificationService planningDeclarationsVerificationService)
        {
            _declarationsService = declarationsService;
            _uriService = uriService;
            _declarationsHub = declarationsHub;
            _firmDeclarationsService = firmDeclarationsService;
            _currentAccount = currentAccount;
            _planningDeclarationsService = planningDeclarationsService;
            _planningDeclarationsVerificationService = planningDeclarationsVerificationService;
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
            //   await _planningDeclarationsService.CalcPlan(1);
            await _declarationsHub.Clients.All.SendAsync("GibScan", id);

            return Ok();
        }

        [Route("api/declarations/firm-assign")]
        [HttpPost]
        public async Task<IActionResult> DeclarationsFirmAssing(int firmId, List<int> declarationSelectId)
        {
            var firmItem = await _currentAccount.GetCurrentAccount(firmId);
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
            await _planningDeclarationsService.CalcPlan(firmId);
            return Ok("Ok");
        }

        [Route("api/declarations/firm-of-declarations")]
        [HttpGet]
        public async Task<IActionResult> DeclarationsOfFirm(int firmId)
        {
          
            var result = await _planningDeclarationsService.GetPlanResultService(firmId);
            return Ok(result);
        }
        
        [Route("api/declarations/declarations-firm-list")]
        [HttpGet]
        public async Task<IActionResult> DeclarationsFirmList(int firmId)
        {
            return Ok(await  _declarationsService.DeclarationsFirmListAsync(firmId));
        }
    }
}