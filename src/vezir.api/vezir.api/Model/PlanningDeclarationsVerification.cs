using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class PlanningDeclarationsVerification
{
    [Required] public int Id { get; set; }
    [Required] public DateTime CreateDate { get; set; }
    [Required] public DateTime VerificationDate { get; set; }
    [Required] public int Approval { get; set; }
    [Required] public string IncomingAssessmentId { get; set; }
    [Required] public string IncomingDeclarationsCode { get; set; }
    [Required] public int FirmId { get; set; }
    [Required] public int DeclarationsId { get; set; }
    [Required] public string Period { get; set; }
    [Required] public int PlanningDeclarationsId { get; set; }
    [Required] public string IncomingDeclarationsId{ get; set; }


  


}