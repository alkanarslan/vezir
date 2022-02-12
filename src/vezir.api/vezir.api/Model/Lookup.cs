using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class Lookup
{
    [Required]
    public int LookupID { get; set; }
    [Required]
    public int SubLookupID { get; set; }
    
    [Required]
    public string Name { get; set; }

    [Required]
    public bool Visible { get; set; }
}