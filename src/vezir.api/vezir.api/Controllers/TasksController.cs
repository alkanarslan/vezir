using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using vezir.api.Interface;
using vezir.api.RequestModel;
using vezir.api.ResponseModel;
using vezir.api.Model;
using Task = vezir.api.Model.Task;

namespace vezir.api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TasksController : BaseApiController
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        this._taskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var getTasksResponse = await _taskService.GetTasks(UserID);

        if (!getTasksResponse.Success)
        {
            return UnprocessableEntity(getTasksResponse);
        }
            
        var tasksResponse = getTasksResponse.Tasks.ConvertAll(o => new TaskResponse { Id = o.Id, IsCompleted = o.IsCompleted, Name = o.Name, Ts = o.Ts });

        return Ok(tasksResponse);
    }

    [HttpPost]
    public async Task<IActionResult> Post(TaskRequest taskRequest)
    {
        var task = new Task { IsCompleted = taskRequest.IsCompleted, Ts = taskRequest.Ts, Name = taskRequest.Name, UserId = UserID };

        var saveTaskResponse = await _taskService.SaveTask(task);

        if (!saveTaskResponse.Success)
        {
            return UnprocessableEntity(saveTaskResponse);
        }

        var taskResponse = new TaskResponse { Id = saveTaskResponse.Task.Id, IsCompleted = saveTaskResponse.Task.IsCompleted, Name = saveTaskResponse.Task.Name, Ts = saveTaskResponse.Task.Ts };
            
        return Ok(taskResponse);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleteTaskResponse = await _taskService.DeleteTask(id, UserID);
        if (!deleteTaskResponse.Success)
        {
            return UnprocessableEntity(deleteTaskResponse);
        }

        return Ok(deleteTaskResponse.TaskId);
    }
}