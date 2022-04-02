using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;
using vezir.api.ResponseModel;

namespace vezir.api.Repository;

public class PlanningDeclarationsRepository : GenericRepository<PlanningDeclarations>, IPlanningDeclarationsService
{
    private readonly ILogger<PlanningDeclarationsRepository> _logger;
    public PlanningDeclarationsRepository(VezirApiContext context, ILogger<PlanningDeclarationsRepository> logger) :
        base(context)
    {
        _logger = logger;
    }

    public async Task CalcPlan(int firmId)
    {
        var today = DateTime.Now;
        var firmPlan = await Context.FirmDeclarations.Where(p => p.FirmId == firmId).ToListAsync();
        foreach (var item in firmPlan)
        {
            var declaration = await Context.Declarations.FirstOrDefaultAsync(p => p.Id == item.DeclarationsId);
            
            Console.Write(declaration.TimeType);
            switch (declaration.TimeType)
            {
                case 24: //Aylık
                    var planDate =today.AddMonths(1);
                    _logger.LogInformation("Aylık");

                    var periodMonth =
                        $"{planDate.ToString("MM")}/{planDate.Year}-{planDate.ToString("MM")}/{planDate.Year}";
                    var lastPaymentDate = new DateTime(planDate.Year, planDate.Month, declaration.LastDay).AddMonths(1);
                    Console.Write(lastPaymentDate);
                    var itemPlanDeclarations = new PlanningDeclarations
                    {
                        CreateDate = DateTime.Now,
                        FirmId = item.FirmId,
                        DeclarationsId = item.DeclarationsId,
                        Period = periodMonth,
                        LastPaymentDate =lastPaymentDate
                    };
                    await Context.PlanningDeclarations.AddAsync(itemPlanDeclarations);
                    await SaveChangesAsync();

                    break;
                case 25://3 Aylık
                    
                    var whoPeriod = Math.Ceiling((double)today.Month / 3);

                    var lastMonthPeriod = whoPeriod * 3;
                    var firstMonthPeriod = lastMonthPeriod - 2;

                    var firstRangePeriod = new DateTime(today.Year, Convert.ToInt32(firstMonthPeriod), 1);
                    var lastRangePeriod = new DateTime(today.Year, Convert.ToInt32(lastMonthPeriod), 1);

                    var period3Month =
                        $"{firstRangePeriod.ToString("MM")}/{firstRangePeriod.Year}-{lastRangePeriod.ToString("MM")}/{lastRangePeriod.Year}";
                    var lastPaymentDate3 =
                        new DateTime(lastRangePeriod.Year, lastRangePeriod.Month, declaration.LastDay)
                            .AddMonths(1);
                    var itemPlanDeclarations1 = new PlanningDeclarations
                    {
                        CreateDate = DateTime.Now,
                        FirmId = item.FirmId,
                        DeclarationsId = item.DeclarationsId,
                        Period = period3Month,
                        LastPaymentDate = lastPaymentDate3
                    };
                    await Context.PlanningDeclarations.AddAsync(itemPlanDeclarations1);
                    await SaveChangesAsync();

                    break;
                case 27: //Yıllık
                    
                    break;
            }
        }
    }

    public async Task<List<DeclarationNotificationsRequestModel>> GetPlanResultService(int firmId)
    {
        var result = await (from p in Context.PlanningDeclarations
            join lk in Context.Declarations on p.DeclarationsId equals  lk.Id
            join look in Context.Lookup on lk.TimeType equals look.LookupID
            join pv in Context.PlanningDeclarationsVerification on p.Id equals pv.PlanningDeclarationsId into dept from pvd in dept.DefaultIfEmpty()
            where p.FirmId == firmId
            
            select new DeclarationNotificationsRequestModel
            {
                Period = p.Period,
                PlanningDeclarationsId = p.Id,
                Approval = pvd.Approval == null ? 188 : pvd.Approval,
                DeclarationComment = $"{lk.Code} ( {look.Name} )",
                LastPaymentDate = p.LastPaymentDate.ToString("dd-MM-yyyy"),
                VerificationDate = pvd.VerificationDate == null ? "Oluşmamış" : pvd.VerificationDate.ToString("dd-MM-yyyy")
            }).ToListAsync();
        
        
        return result;
    }
}