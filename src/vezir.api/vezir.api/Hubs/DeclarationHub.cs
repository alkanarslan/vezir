using Microsoft.AspNetCore.SignalR;

namespace vezir.api.Hubs;

public class DeclarationHub : Hub
{
    private readonly ILogger<DeclarationHub> _logger;

    public DeclarationHub(ILogger<DeclarationHub> logger)
    {
        _logger = logger;
    }
    public async Task SendMessage(string message)
    {
        Console.WriteLine(message);
        await Clients.All.SendAsync("SendMessage",  message);
    }
    public async Task GibScan(string message)
    {
        Console.WriteLine(message);
        await Clients.All.SendAsync("GibScan",  message);
    }
    public override async Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("GetConnectionId", this.Context.ConnectionId);
    }
   
}