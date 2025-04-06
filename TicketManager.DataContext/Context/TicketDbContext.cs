using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Context
{
    public class TicketDbContext : DbContext
    {
        public TicketDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Entities.Movie> Movies { get; set; }
        public DbSet<Entities.Order> Orders { get; set; }
        public DbSet<Entities.Role> Roles { get; set; }
        public DbSet<Entities.Room> Rooms { get; set; }
        public DbSet<Entities.Screening> Screenings { get; set; }
        public DbSet<Entities.Ticket> Tickets { get; set; }
        public DbSet<Entities.User> Users { get; set; }
        public DbSet<Entities.Setting> Settings { get; set; }
    }
}
