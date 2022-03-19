namespace vezir.api.ResponseModel;

public class FirmOfDeclarations
{
    public  string Period { get; set; }
    public int DeclarationId { get; set; }
    public string DeclarationComment { get; set; }
    public int Approval { get; set; }
    public DateTime LastPaymentDate { get; set; }
}

// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
public class vodia
{
    public string acd { get; set; }
    public string callid { get; set; }
    public string from { get; set; }
    public string to { get; set; }
    public int duration { get; set; }
    public string state { get; set; }
    public string extension { get; set; }
    public string reason { get; set; }
}
