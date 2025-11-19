using LibraryInReact.API.Controllers.Services;
using LibraryInReact.API.Controllers.Services.Authentication;
using LibraryInReact.API.Controllers.Services.Users;
using LibraryInReact.API.Controllers.Services.Debts;
using LibraryInReact.API.Controllers.Services.Notifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "https://localhost:3000", "https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add JWT Authentication
var jwtSecretKey = builder.Configuration["Jwt:SecretKey"] ?? "your-256-bit-secret-key-for-development-only-change-in-production";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "LibraryInReact";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "LibraryInReact-Users";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Register existing services
builder.Services.AddScoped<ILibraryService, LibraryService>();
builder.Services.AddScoped<IEventService, EventService>();

// Register authentication services
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Register user management services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILibraryCardService, LibraryCardService>();

// Register debt management services
builder.Services.AddScoped<IDebtService, DebtService>();

// Register notification services
builder.Services.AddScoped<INotificationService, NotificationService>();

var app = builder.Build();

// Use CORS
app.UseCors("AllowReactApp");

// Enable static file serving
app.UseStaticFiles();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
  var context = service.GetRequiredService<AppDbContext>();
  await context.Database.MigrateAsync();
  await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
  //Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
  var logger = service.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "An error occurred while initializing the database.");
  throw;
}
app.Run();
  