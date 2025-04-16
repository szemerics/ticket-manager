using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IScreeningService
    {
        Task<IEnumerable<ScreeningDto>> GetScreeningsAsync();
        Task<ScreeningDto> GetScreeningByIdAsync(int id);
        Task<ScreeningDto> CreateScreeningAsync(ScreeningCreateDto screening);
        Task<ScreeningDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screening);
        Task<bool> DeleteScreeningAsync(int id);
    }
    public class ScreeningService : IScreeningService
    {
        private readonly TicketDbContext _context;
        private readonly IMapper _mapper;
        public ScreeningService(TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ScreeningDto> CreateScreeningAsync(ScreeningCreateDto screeningDto)
        {
            var screening = _mapper.Map<Screening>(screeningDto);

            if (screening.ScreeningPrice == 0)
            {
                var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == "BaseScreeningPrice");

                if (setting == null)
                {
                    throw new KeyNotFoundException(message: "Base screening price not found.");
                }

                screening.ScreeningPrice = decimal.Parse(setting.Value);
            }


            await _context.Screenings.AddAsync(screening);
            await _context.SaveChangesAsync();

            var createdScreening = await _context.Screenings
                .Include(s => s.Movie)
                .Include(s => s.Room)
                .Include(s => s.Tickets)
                .FirstOrDefaultAsync(s => s.Id == screening.Id);

            if (createdScreening == null)
            {
                throw new Exception("Error during creation of screening.");
            }

            return _mapper.Map<ScreeningDto>(createdScreening);
        }


        public async Task<bool> DeleteScreeningAsync(int id)
        {
            var screening = await _context.Screenings.FindAsync(id);
            if (screening == null)
            {
                throw new KeyNotFoundException(message: "Screening not found.");
            }

            _context.Screenings.Remove(screening);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<ScreeningDto> GetScreeningByIdAsync(int id)
        {
            var screening = await _context.Screenings.FindAsync(id);
            if (screening == null)
            {
                throw new KeyNotFoundException(message: "Screening not found.");
            }

            var createdScreening = await _context.Screenings
                    .Include(s => s.Movie)
                    .Include(s => s.Room)
                    .Include(s => s.Tickets)
                    .FirstOrDefaultAsync();

            return _mapper.Map<ScreeningDto>(createdScreening);
        }

        public async Task<IEnumerable<ScreeningDto>> GetScreeningsAsync()
        {
            var screenings = await _context.Screenings
                .Include(s => s.Movie)
                .Include(s => s.Room)
                .Include(s => s.Tickets)
                .ToListAsync();
            return _mapper.Map<IEnumerable<ScreeningDto>>(screenings);
        }

        public async Task<ScreeningDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screeningDto)
        {
            var screening = await _context.Screenings
                .Include(s => s.Movie)
                .Include(s => s.Room)
                .Include(s => s.Tickets)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (screening == null)
            {
                throw new KeyNotFoundException(message: "Screening not found.");
            }
            _mapper.Map(screeningDto, screening);
            await _context.SaveChangesAsync();
            return _mapper.Map<ScreeningDto>(screening);
        }
    }
}
