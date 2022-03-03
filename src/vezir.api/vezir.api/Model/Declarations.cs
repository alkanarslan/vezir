using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class Declarations
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }
    [Required]
    public string Code { get; set; }
    
    [Required]
    public int TimeType { get; set; }

}