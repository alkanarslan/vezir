using vezir.api.GenericRepository;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Repository;

public class FirmContactServiceRepository: GenericRepository<FirmContact>,IFirmContactService
{
    public  FirmContactServiceRepository(VezirApiContext context) : base(context)
    {
    }
}