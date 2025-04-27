using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IRoomService
    {
        Task<RoomDto> GetRoomByIdAsync(int roomId);
        Task<RoomDto> CreateRoomAsync(RoomCreateDto dto);
        Task<RoomDto> UpdateRoomAsync(int roomId, RoomUpdateDto dto);
        Task<bool> DeleteRoomAsync(int roomId);
    }

    public class RoomService : IRoomService
    {
        private readonly TicketDbContext _context;
        private readonly IMapper _mapper;

        public RoomService(TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<RoomDto> GetRoomByIdAsync(int roomId)
        {
            var room = await _context.Rooms
                .Include(r => r.Screenings)
                .ThenInclude(s => s.Seats)
                .Where(r => r.Id == roomId)
                .FirstOrDefaultAsync();
            if (room == null)
                throw new KeyNotFoundException(message: "Room not found.");

            return _mapper.Map<RoomDto>(room);
        }

        public async Task<RoomDto> CreateRoomAsync(RoomCreateDto roomDto)
        {
            var room = _mapper.Map<Room>(roomDto);
            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
            return _mapper.Map<RoomDto>(room);
        }

        public async Task<RoomDto> UpdateRoomAsync(int roomId, RoomUpdateDto roomDto)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
                throw new KeyNotFoundException(message: "Room not found.");
            _mapper.Map(roomDto, room);
            await _context.SaveChangesAsync();
            return _mapper.Map<RoomDto>(room);
        }

        public async Task<bool> DeleteRoomAsync(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                throw new KeyNotFoundException(message: "Room not found.");
            }


            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
