using Quartz;

namespace vezir.api.Jobs;

[DisallowConcurrentExecution]
public class DeclarationCalcJob : IJob
{
    
    private readonly ILogger<DeclarationCalcJob> _logger;

    public DeclarationCalcJob(ILogger<DeclarationCalcJob> logger)
    {
        _logger = logger;
    }

    public Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation("Hello world!");
        return Task.CompletedTask;
    }
}