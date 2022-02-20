namespace vezir.api.Wrappers;

public class VezirResponse<T>
{
    public VezirResponse()
    {
        
    }
    public VezirResponse(T data)
    {
        Succeeded = true;
        Message = string.Empty;
        Errors = null;
        Data = data;
    }
    public T Data { get; set; }
    public bool Succeeded { get; set; }

    public string[] Errors { get; set; }
    public string Message { get; set; }
}