using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

namespace vezir.api.Repository;

public class PlanningDeclarationsVerificationRepository : GenericRepository<PlanningDeclarationsVerification>, IPlanningDeclarationsVerificationService
{
    public PlanningDeclarationsVerificationRepository(VezirApiContext context) : base(context)
    {
    }
}