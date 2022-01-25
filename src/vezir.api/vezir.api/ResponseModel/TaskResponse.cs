namespace vezir.api.ResponseModel;

public class TaskResponse : BaseResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime Ts { get; set; }
}