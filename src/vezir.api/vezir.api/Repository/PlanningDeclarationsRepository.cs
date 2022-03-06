using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

namespace vezir.api.Repository;

public class PlanningDeclarationsRepository : GenericRepository<PlanningDeclarations>, IPlanningDeclarationsService
{
    private readonly ILogger<PlanningDeclarationsRepository> _logger;
    public PlanningDeclarationsRepository(VezirApiContext context, ILogger<PlanningDeclarationsRepository> logger) : base(context)
    {
        _logger = logger;
    }

    public async Task CalcPlan(int firmId)
    {
        var firmPlan = await  Context.FirmDeclarations.Where(p => p.FirmId == firmId).ToListAsync();

        foreach (var item in firmPlan)
        {
            var declaration = await Context.Declarations.FirstOrDefaultAsync(p => p.Id == item.DeclarationsId);
            
            _logger.LogInformation(declaration?.Code);
            
        }
        throw new NotImplementedException();
    }
}