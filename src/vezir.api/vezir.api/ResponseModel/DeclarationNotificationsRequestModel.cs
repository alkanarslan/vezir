namespace vezir.api.ResponseModel;

public class DeclarationNotificationsRequestModel
{
    public int PlanningDeclarationsId { get; set; }
    public string DeclarationComment { get; set; }
    public string Period { get; set; }
    public string LastPaymentDate { get; set; }
    public int Approval { get; set; }
    public string  VerificationDate { get; set; }
}