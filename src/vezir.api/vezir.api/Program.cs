using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using vezir.api;
using vezir.api.Helper;
using vezir.api.Interface;
using vezir.api.Services;

var builder = WebApplication.CreateBuilder(args);
var  vezirAllowSpecificOrigins = "_vezirAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
    options.AddPolicy(name: vezirAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("*").AllowAnyHeader()
                .AllowAnyMethod();
            
        });
});
builder.Services.AddTransient<ITokenService, TokenService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITaskService, TaskService>();
builder.Services.AddTransient<ICurrentAccount, CurrentAccountService>();
builder.Services.AddAuthorization();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(vezirAllowSpecificOrigins);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();