using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class PlanningDeclarations
{
    [Required] public int Id { get; set; }
    [Required] public int FirmId { get; set; }
    [Required] public int DeclarationsId { get; set; }
    [Required] public string Period { get; set; }
    [Required] public DateTime CreateDate { get; set; }
}