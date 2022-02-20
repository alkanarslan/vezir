using Microsoft.AspNetCore.Mvc;
using vezir.api.Helper;
using vezir.api.Interface;

namespace vezir.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeclarationsController : ControllerBase
    {
        private readonly IDeclarationsService _declarationsService;
        private readonly IUriService _uriService;
        public DeclarationsController(IDeclarationsService declarationsService, IUriService uriService)
        {
            _declarationsService = declarationsService;
            this._uriService = uriService;
        }
        [HttpGet]
        public async Task<IActionResult> AllDeclarations([FromQuery] PaginationFilter filter)
        {
            var route = Request.Path.Value;
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            var pagedData = await _declarationsService.ToFilterListAsync(validFilter);
            var totalRecords = await _declarationsService.GetCountAsync();
            //Console.WriteLine(totalRecords);
            
            var pagedReponse = PaginationHelper.CreatePagedReponse(pagedData, validFilter, totalRecords, _uriService,route);

            return Ok(pagedReponse);
        }
        
    }
}