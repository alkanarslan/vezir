
using System.Security.Cryptography;
using vezir.api.GenericRepository;
using vezir.api.Model;


namespace vezir.api.Interface;


public interface IPlanningDeclarationsService : IGenericRepository<PlanningDeclarations>
{
    Task CalcPlan(int FirmId);
}