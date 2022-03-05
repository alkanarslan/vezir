using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

namespace vezir.api.Repository;

public class FirmDeclarationsRepository : GenericRepository<FirmDeclarations>, IFirmDeclarationsService
{
    public FirmDeclarationsRepository(VezirApiContext context) : base(context)
    {
    }
}