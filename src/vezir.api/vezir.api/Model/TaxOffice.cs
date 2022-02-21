using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class TaxOffice
{
    [Required]
    public int Id { get; set; }
    [Required]
    public int CityId { get; set; }
    [Required]
    public string CityName { get; set; }
    [Required]
    public string DistrictName { get; set; }
    [Required]
    public string Name { get; set; }


  
}