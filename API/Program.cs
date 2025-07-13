using Microsoft.EntityFrameworkCore;
using Persistence;

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

builder.Services.AddDbContext<AppDbContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

// Use CORS
app.UseCors("AllowReactApp");

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
  