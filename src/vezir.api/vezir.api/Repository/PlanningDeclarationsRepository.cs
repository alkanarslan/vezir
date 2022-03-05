using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

namespace vezir.api.Repository;

public class PlanningDeclarationsRepository : GenericRepository<PlanningDeclarations>, IPlanningDeclarationsService
{
    public PlanningDeclarationsRepository(VezirApiContext context) : base(context)
    {
    }
}