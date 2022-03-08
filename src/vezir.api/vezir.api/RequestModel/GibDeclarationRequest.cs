namespace vezir.api.RequestModel;

public class GibDeclarationRequest
{
    public string? gibDeclarationId { get; set; }
    public string? gibDate { get; set; }
    public string? gibDeclarationType { get; set; }
    public string? gibTaxNo { get; set; }
    public string? gibApproval { get; set; }
    public string? gibAssessmentId { get; set; }
    public string? gibPeriod { get; set; }

}

public class ListGibDeclarationRequest
{
    public List<GibDeclarationRequest>  AllList { get; set; }
}