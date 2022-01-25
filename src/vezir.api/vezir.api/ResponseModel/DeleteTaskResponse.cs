
using System.Text.Json.Serialization;
namespace vezir.api.ResponseModel;

public class DeleteTaskResponse : BaseResponse
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int TaskId { get; set; }
}