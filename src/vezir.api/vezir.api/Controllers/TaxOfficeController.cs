using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxOfficeController : Controller
    {
        private readonly ITaxOfficeRepository _taxOfficeRepository;

        public TaxOfficeController(ITaxOfficeRepository taxOfficeRepository)
        {
            _taxOfficeRepository = taxOfficeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOffice()
        {
            var taxOfficeItems = await _taxOfficeRepository.FindAsync(p=> p.CityId == 34);

            return Ok(taxOfficeItems);

        }

    }
}