using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.ResponseModel;



namespace vezir.api.Services;

public class TaskService : ITaskService
    {
        private readonly VezirApiContext _vezirApiContext;

        public TaskService(VezirApiContext vezirApiContext)
        {
            _vezirApiContext = vezirApiContext;
        }


        public async Task<DeleteTaskResponse> DeleteTask(int taskId, int userId)
        {
            var task = await _vezirApiContext.Tasks.FindAsync(taskId);

            if (task == null)
            {
                return new DeleteTaskResponse
                {
                    Success = false,
                    Error = "Task not found",
                    ErrorCode = "T01"
                };
            }

            if (task.UserId != userId)
            {
                return new DeleteTaskResponse
                {
                    Success = false,
                    Error = "You don't have access to delete this task",
                    ErrorCode = "T02"
                };
            }

            _vezirApiContext.Tasks.Remove(task);

            var saveResponse = await _vezirApiContext.SaveChangesAsync();

            if (saveResponse >= 0)
            {
                return new DeleteTaskResponse
                {
                    Success = true,
                    TaskId = task.Id
                };
            }

            return new DeleteTaskResponse
            {
                Success = false,
                Error = "Unable to delete task",
                ErrorCode = "T03"
            };
        }

        public async Task<GetTasksResponse> GetTasks(int userId)
        {
            var tasks = await _vezirApiContext.Tasks.Where(o => o.UserId == userId).ToListAsync();

            if (tasks.Count == 0)
            {
                return new GetTasksResponse
                { 
                    Success = false, 
                    Error = "No tasks found for this user", 
                    ErrorCode = "T04"
                };
            }

            return new GetTasksResponse { Success = true, Tasks = tasks };

        }

        public async Task<SaveTaskResponse> SaveTask(vezir.api.Model.Task task)
        {
            await _vezirApiContext.Tasks.AddAsync(task);

            var saveResponse = await _vezirApiContext.SaveChangesAsync();
            
            if (saveResponse >= 0)
            {
                return new SaveTaskResponse
                {
                    Success = true,
                    Task = task
                };
            }
            return new SaveTaskResponse
            {
                Success = false,
                Error = "Unable to save task",
                ErrorCode = "T05"
            };
        }
    }