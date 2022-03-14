
using System.Security.Cryptography;
using vezir.api.GenericRepository;
using vezir.api.Model;
using vezir.api.ResponseModel;


namespace vezir.api.Interface;


public interface IPlanningDeclarationsService : IGenericRepository<PlanningDeclarations>
{
    Task CalcPlan(int FirmId);
    Task<List<DeclarationNotificationsRequestModel>> GetPlanResultService(int firmId);
    
}