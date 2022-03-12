
using vezir.api.GenericRepository;
using vezir.api.Helper;
using vezir.api.Model;
using vezir.api.ResponseModel;

namespace vezir.api.Interface;

public interface IDeclarationsService : IGenericRepository<Declarations>
{
    Task<List<DeclarationsResponseModel>> DeclarationsFilterListAsync(PaginationFilter paginationFilter);
    
    Task<List<DeclarationsResponseModel>> DeclarationsFirmListAsync(int firmId);
    
    
}