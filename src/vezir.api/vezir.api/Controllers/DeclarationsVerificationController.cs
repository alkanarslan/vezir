using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using vezir.api.Helper;
using vezir.api.Hubs;
using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.RequestModel;

namespace vezir.api.Controllers
{
    [ApiController]
    public class DeclarationsVerificationController : ControllerBase
    {
        private readonly IDeclarationsService _declarationsService;
        private readonly IFirmDeclarationsService _firmDeclarationsService;
        private readonly IPlanningDeclarationsService _planningDeclarationsService;
        private readonly ICurrentAccount _currentAccount;
        private readonly IUriService _uriService;
        private readonly IHubContext<DeclarationHub> _declarationsHub;

        public DeclarationsVerificationController(IDeclarationsService declarationsService, IFirmDeclarationsService firmDeclarationsService, IPlanningDeclarationsService planningDeclarationsService, ICurrentAccount currentAccount, IUriService uriService, IHubContext<DeclarationHub> declarationsHub)
        {
            _declarationsService = declarationsService;
            _firmDeclarationsService = firmDeclarationsService;
            _planningDeclarationsService = planningDeclarationsService;
            _currentAccount = currentAccount;
            _uriService = uriService;
            _declarationsHub = declarationsHub;
        }
        
        [Route("api/declarationsVerification")]
        [HttpPost]
        public async Task<IActionResult> DeclarationsVerification(ListGibDeclarationRequest gibDeclarationRequest)
        {

            foreach (var item in gibDeclarationRequest.AllList)
            {
                Console.WriteLine(item.gibApproval);
            }
           Console.WriteLine(gibDeclarationRequest.AllList.Count);
            return Ok("Ok");
        }
    }
}