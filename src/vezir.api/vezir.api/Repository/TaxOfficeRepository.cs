using vezir.api.GenericRepository;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Repository;

public class TaxOfficeRepository : GenericRepository<TaxOffice>,ITaxOfficeRepository
{
    public TaxOfficeRepository(VezirApiContext context) : base(context)
    {
        
    }
}