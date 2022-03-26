using System.ComponentModel.DataAnnotations;

namespace vezir.api.Model;

public class FirmContact
{
    [Required] public int Id { get; set; }
    [Required] public int CurrentAccountId { get; set; }
    [Required] public string Name { get; set; }
    [Required] public string PhoneNumber { get; set; }
    [Required] public string Email { get; set; }
    [Required] public DateTime CreateDate { get; set; }
}