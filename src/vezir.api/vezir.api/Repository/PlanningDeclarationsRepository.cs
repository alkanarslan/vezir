using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;
using vezir.api.GenericRepository;

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
        var firmPlan = await Context.FirmDeclarations.Where(p => p.FirmId == firmId).ToListAsync();
        foreach (var item in firmPlan)
        {
            var declaration = await Context.Declarations.FirstOrDefaultAsync(p => p.Id == item.DeclarationsId);
            switch (declaration.TimeType)
            {
                case 24:
                    //bu case 24 olacak unutma !!
                    //Şuanda gelecek ayın planını yapıyor odemesinide 1 sonraya kaydediyor.
                    var planDate = item.CreateDate.AddMonths(1);
                    _logger.LogInformation("Aylık");

                    var periodMonth = $"{planDate.ToString("MM")}/{planDate.Year}-{planDate.ToString("MM")}/{planDate.Year}";
                        var itemPlanDeclarations = new PlanningDeclarations
                    {
                        CreateDate = DateTime.Now,
                        FirmId = item.FirmId,
                        DeclarationsId = item.DeclarationsId,
                        Period = periodMonth,
                        LastPaymentDate = new DateTime(planDate.Year, planDate.Month, declaration.LastDay).AddMonths(1)
                    };
                    await Context.PlanningDeclarations.AddAsync(itemPlanDeclarations);
                    await SaveChangesAsync();

                    break;
                case 25:
                    _logger.LogInformation(item.CreateDate.Month.ToString());
                    var whoPeriod = Math.Ceiling((double)item.CreateDate.Month / (double)3);

                    var lastMonthPeriod = whoPeriod * 3;
                    var firstMonthPeriod = lastMonthPeriod - 2;

                    var firstRangePeriod = new DateTime(item.CreateDate.Year, Convert.ToInt32(firstMonthPeriod), 1);
                    var lastRangePeriod = new DateTime(item.CreateDate.Year, Convert.ToInt32(lastMonthPeriod), 1);

                     var period3Month = $"{firstRangePeriod.ToString("MM")}/{firstRangePeriod.Year}-{lastRangePeriod.ToString("MM")}/{lastRangePeriod.Year}";
                    _logger.LogInformation(period3Month);
                   
                    _logger.LogInformation("3 Aylık " + whoPeriod + " Dönem");
                    
                   
                    var itemPlanDeclarations1 = new PlanningDeclarations
                    {
                        CreateDate = DateTime.Now,
                        FirmId = item.FirmId,
                        DeclarationsId = item.DeclarationsId,
                        Period = period3Month,
                        LastPaymentDate = new DateTime(lastRangePeriod.Year, lastRangePeriod.Month, declaration.LastDay).AddMonths(1)
                    };
                    await Context.PlanningDeclarations.AddAsync(itemPlanDeclarations1);
                    await SaveChangesAsync();
                    
                    break;
            }
        }
    }
}