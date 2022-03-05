using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quartz;
using vezir.api;
using vezir.api.GenericRepository;
using vezir.api.Helper;
using vezir.api.Hubs;
using vezir.api.Interface;
using vezir.api.Jobs;
using vezir.api.Repository;
using vezir.api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IUriService>(o =>
{
    var accessor = o.GetRequiredService<IHttpContextAccessor>();
    var request = accessor.HttpContext?.Request;
    var uri = string.Concat(request?.Scheme, "://" ,request?.Host.ToUriComponent());
    return new UriService(uri);
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddDbContext<VezirApiContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("VezirDbConnectionString")));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = TokenHelper.Issuer,
            ValidAudience = TokenHelper.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(TokenHelper.Secret))
        };
 
    });
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_vezirAllowSpecificOrigins",
        builder =>
        {
            builder.SetIsOriginAllowed(_ => true).AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        });
});
builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITaskService, TaskService>();
builder.Services.AddTransient<ICurrentAccount, CurrentAccountService>();
builder.Services.AddTransient<ILookupRepository, LookupRepository>();
builder.Services.AddTransient<IDeclarationsService, DeclarationsRepository>();
builder.Services.AddTransient<ITaxOfficeRepository, TaxOfficeRepository>();
builder.Services.AddTransient<IFirmDeclarationsService, FirmDeclarationsRepository>();
builder.Services.AddTransient<IPlanningDeclarationsService, PlanningDeclarationsRepository>();
builder.Services.AddTransient<IPlanningDeclarationsVerificationService, PlanningDeclarationsVerificationRepository>();
builder.Services.AddAuthorization();
builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();
    var jobKey = new JobKey("DeclarationCalcJob");
    q.AddJob<DeclarationCalcJob>(opts => opts.WithIdentity(jobKey));
    q.AddTrigger(opts => opts.ForJob(jobKey).WithIdentity("DeclarationCalcJob-trigger").WithCronSchedule("0 0 0 ? * * *"));
});

builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("_vezirAllowSpecificOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHub<DeclarationHub>("/vezirhub");
app.Run();
