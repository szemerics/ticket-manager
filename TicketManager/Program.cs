using Microsoft.EntityFrameworkCore;
using TicketManager.DataContext.Context;
using TicketManager.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();


// Connection String
builder.Services.AddDbContext<TicketDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("TicketManagerContext")));

builder.Services.AddScoped<IMovieService, MovieService>();

// Adding Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
