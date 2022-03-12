namespace vezir.api.ResponseModel;

public class FirmOfDeclarations
{
    public  string Period { get; set; }
    public int DeclarationId { get; set; }
    public string DeclarationComment { get; set; }
    public int Approval { get; set; }
    public DateTime LastPaymentDate { get; set; }
}