using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly VezirApiContext _context;
        private readonly ILookupRepository _lookupRepository;

        public LookupController(VezirApiContext context, ILookupRepository lookupRepository)
        {
            _context = context;
            _lookupRepository = lookupRepository;
        }

        // GET: api/Lookup
        [HttpGet]
        public  IEnumerable<Lookup> SubLookup(int id)
        {
            return _lookupRepository.Find(p => p.SubLookupID == id);
        }
    

        // GET: api/Lookup/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lookup>> GetLookup(int id)
        {
            var lookup = await _context.Lookup.FindAsync(id);

            if (lookup == null)
            {
                return NotFound();
            }

            return lookup;
        }

        // PUT: api/Lookup/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLookup(int id, Lookup lookup)
        {
            if (id != lookup.LookupID)
            {
                return BadRequest();
            }

            _context.Entry(lookup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LookupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Lookup
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Lookup>> PostLookup(Lookup lookup)
        {
            _context.Lookup.Add(lookup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLookup", new { id = lookup.LookupID }, lookup);
        }

        // DELETE: api/Lookup/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLookup(int id)
        {
            var lookup = await _context.Lookup.FindAsync(id);
            if (lookup == null)
            {
                return NotFound();
            }

            _context.Lookup.Remove(lookup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LookupExists(int id)
        {
            return _context.Lookup.Any(e => e.LookupID == id);
        }
    }
}
