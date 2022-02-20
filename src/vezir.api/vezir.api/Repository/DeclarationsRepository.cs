using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

namespace vezir.api.Repository;

public class DeclarationsRepository : GenericRepository<Declarations>, IDeclarationsService
{
 
    public DeclarationsRepository(VezirApiContext context) : base(context)
    {
    }
}