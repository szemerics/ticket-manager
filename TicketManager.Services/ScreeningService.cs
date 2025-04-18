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
        Task<ScreeningDto> GetScreeningByIdAsync(int screeningId);
        Task<ScreeningDto> GetScreeningByMovieIdAsync(int movieId);
        Task<ScreeningDto> CreateScreeningAsync(ScreeningCreateDto screening);
        Task<ScreeningDto> UpdateScreeningAsync(int id, ScreeningUpdateDto screening);
        Task<bool> DeleteScreeningAsync(int screeningId);
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
            var room = await _context.Rooms.FindAsync(screeningDto.RoomId);
            if (room == null)
            {
                throw new KeyNotFoundException(message: "Room not found.");
            }

            var screening = new Screening
            {
                RoomId = screeningDto.RoomId,
                ScreeningPrice = screeningDto.ScreeningPrice ?? throw new ArgumentNullException(nameof(screeningDto.ScreeningPrice)),
                ScreeningTime = screeningDto.ScreeningTime,
                MovieId = screeningDto.MovieId,
                Seats = new List<Seat>()
            };


            // Generating Seats based on Room dimensions
            for (int row = 1; row <= room.RowNumber; row++)
            {
                for (int column = 1; column <= room.ColumnNumber; column++)
                {
                    screening.Seats.Add(new Seat
                    {
                        Row = row,
                        Column = column,
                        ScreeningId = screening.Id,
                        IsReserved = false
                    });
                }
            }


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

            //var createdScreening = await _context.Screenings
            //    .Include(s => s.Movie)
            //    .Include(s => s.Room)
            //    .Include(s => s.Tickets)
            //    .FirstOrDefaultAsync(s => s.Id == screening.Id);

            //return _mapper.Map<ScreeningDto>(createdScreening);

            return _mapper.Map<ScreeningDto>(screening);
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

        public async Task<ScreeningDto> GetScreeningByIdAsync(int screeningId)
        {
            var screening = await _context.Screenings
                .Include(s => s.Movie)
                .Include(s => s.Room)
                .Include(s => s.Seats)
                .FirstOrDefaultAsync(s => s.Id == screeningId);

            if (screening == null)
            {
                throw new KeyNotFoundException(message: "Screening not found.");
            }

            return _mapper.Map<ScreeningDto>(screening);
        }

        public async Task<ScreeningDto> GetScreeningByMovieIdAsync(int movieId)
        {
            var screening = await _context.Screenings
                .Include(s => s.Movie)
                .Include(s => s.Room)
                .Include(s => s.Tickets)
                .FirstOrDefaultAsync(s => s.MovieId == movieId);

            return _mapper.Map<ScreeningDto>(screening);
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
