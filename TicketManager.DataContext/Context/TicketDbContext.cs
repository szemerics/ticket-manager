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
        public DbSet<Entities.Seat> Seats { get; set; }
        public DbSet<Entities.Order> Orders { get; set; }
        public DbSet<Entities.Role> Roles { get; set; }
        public DbSet<Entities.Room> Rooms { get; set; }
        public DbSet<Entities.Screening> Screenings { get; set; }
        public DbSet<Entities.Ticket> Tickets { get; set; }
        public DbSet<Entities.User> Users { get; set; }
        public DbSet<Entities.Setting> Settings { get; set; }


        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Seat)
                .WithMany()
                .HasForeignKey(t => t.SeatId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Screening)
                .WithMany(s => s.Tickets)
                .HasForeignKey(t => t.ScreeningId)
                .OnDelete(DeleteBehavior.NoAction);

            // Settings Config
            modelBuilder.Entity<Setting>().HasData(
                new Setting { Id = 1, Key = "BaseScreeningPrice", Value="2500"}, // Default ticket price in HUF
                new Setting { Id = 2, Key = "StudentTicketDiscount", Value = "15"}, // Student discount in %
                new Setting { Id = 3, Key = "SeniorTicketDiscount", Value = "15" }, // Senior discount in %
                new Setting { Id = 4, Key = "DisabledTicketDiscount", Value = "15" }, // Disabled discount in %
                new Setting { Id = 5, Key = "EarlyTicketDiscount", Value = "15" }, // Early bird discount in %
                new Setting { Id = 6, Key = "NormalTicketDiscount", Value = "0" } // Normal ticket discount in %
            );

            // Role Config
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin"},
                new Role { Id = 2, Name = "Cashier" },
                new Role { Id = 3, Name = "Customer" }
            );

        }
    }
}
