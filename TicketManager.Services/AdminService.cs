using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IAdminService
    {
        Task<decimal> GetBaseScreeningPriceAsync();
        Task SetBaseScreeningPriceAsync(decimal newPrice);
    }
    public class AdminService : IAdminService
    {
        private TicketDbContext _context;
        public AdminService (TicketDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> GetBaseScreeningPriceAsync()
        {
            var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == "BaseScreeningPrice");

            if (setting == null)
            {
                throw new KeyNotFoundException(message: "Base screening price not found.");
            }

            return decimal.Parse(setting.Value);
        }

        public async Task SetBaseScreeningPriceAsync(decimal newPrice)
        {
            var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == "BaseScreeningPrice");

            if (setting == null)
            {
                setting = new Setting
                {
                    Key = "BaseScreeningPrice",
                    Value = newPrice.ToString()
                };

                await _context.Settings.AddAsync(setting);
            }

            else
            {
                setting.Value = newPrice.ToString();
                _context.Settings.Update(setting);
            }

            await _context.SaveChangesAsync();
        }
    }
}
