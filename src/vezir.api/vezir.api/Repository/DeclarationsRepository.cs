using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;
using vezir.api.Helper;
using vezir.api.ResponseModel;

namespace vezir.api.Repository;

public class DeclarationsRepository : GenericRepository<Declarations>, IDeclarationsService
{
    public DeclarationsRepository(VezirApiContext context) : base(context)
    {
    }

    public Task<List<DeclarationsResponseModel>> DeclarationsFilterListAsync(PaginationFilter paginationFilter)
    {
        var skip = (paginationFilter.PageNumber - 1) * paginationFilter.PageSize;
        var saaa = (from p in Context.Declarations
            join c in Context.Lookup
                on p.TimeType equals c.LookupID
            select new DeclarationsResponseModel
            {
                Id = p.Id,
                Name = p.Name,
                TimeType = p.TimeType,
                Code = p.Code,
                TimeValue = c.Name
            }).Skip(skip).Take(paginationFilter.PageSize).ToListAsync();
        ;


        // var returnList = Context.Declarations.Join(Context.Lookup, declarations => declarations.TimeType,
        //     lookup => lookup.LookupID, (declarations, lookup) => new DeclarationsResponseModel
        //     {
        //              Id = declarations.Id,
        //              Name = declarations.Name,
        //              TimeType = declarations.TimeType,
        //              Code = declarations.Code,
        //              TimeValue = lookup.Name
        //     }).Skip(skip).Take(paginationFilter.PageSize).ToListAsync();

        return saaa;
    }
}