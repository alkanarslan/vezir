using Task = vezir.api.Model.Task;

namespace vezir.api.ResponseModel;

public class GetTasksResponse : BaseResponse
{
    public List<Task> Tasks { get; set; }
}
