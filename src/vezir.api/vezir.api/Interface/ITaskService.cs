using vezir.api.ResponseModel;

namespace vezir.api.Interface;

public interface ITaskService
{
    Task<GetTasksResponse> GetTasks(int userId);
    Task<SaveTaskResponse> SaveTask(vezir.api.Model.Task task);
    Task<DeleteTaskResponse> DeleteTask(int taskId, int userId);
}