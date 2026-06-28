using CalculatorApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<ICalculatorService, CalculatorService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "Calculator API",
        Version = "v1",
        Description = "A scientific calculator REST API built with .NET 8. Supports arithmetic, trigonometry, logarithms, and more."
    });

    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        c.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Calculator API v1");
    c.RoutePrefix = string.Empty; // Swagger at root
});

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
