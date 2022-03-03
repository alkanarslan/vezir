namespace vezir.api.ResponseModel;

public class DeclarationsResponseModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public int TimeType { get; set; }
    public string TimeValue { get; set; }

    public string Title => Code + " " + Name + " " + "(" +TimeValue + ")";
}
