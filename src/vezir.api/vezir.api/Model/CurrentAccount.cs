namespace vezir.api.Model;

public class CurrentAccount
{
    public int Id { get; set; }
    public string FirmName { get; set; }
    public string FirmDescription { get; set; }
    public int TaxOfficeId { get; set; }
    public Int64 TaxNumber { get; set; }
    public DateTime FirmOpenDate { get; set; }
    public DateTime CreateDate { get; set; }
}