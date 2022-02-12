using vezir.api.GenericRepository;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Repository;

public class LookupRepository: GenericRepository<Lookup>,ILookupRepository
{
    public LookupRepository(VezirApiContext context) : base(context)
    {
    }
}