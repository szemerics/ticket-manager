using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IRoomService
    {
        Task<IEnumerable<RoomDto>> GetRoomsAsync();
        Task<RoomDto> GetRoomByIdAsync(int id);
        Task<RoomDto> CreateRoomAsync(RoomCreateDto dto);
        Task<RoomDto> UpdateRoomAsync(int id, RoomUpdateDto dto);
        Task<bool> DeleteRoomAsync(int id);
    }

    public class RoomService : IRoomService
    {
        private readonly TicketDbContext _context;

        public RoomService(TicketDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoomDto>> GetRoomsAsync()
        {
            return await _context.Rooms
                .Select(r => new RoomDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Capacity = r.Capacity
                })
                .ToListAsync();
        }

        public async Task<RoomDto> GetRoomByIdAsync(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
                return null;

            return new RoomDto
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = room.Capacity
            };
        }

        public async Task<RoomDto> CreateRoomAsync(RoomCreateDto dto)
        {
            var room = new Room
            {
                Name = dto.Name,
                Capacity = dto.Capacity
            };

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return new RoomDto
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = room.Capacity
            };
        }

        public async Task<RoomDto> UpdateRoomAsync(int id, RoomUpdateDto dto)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
                return null;

            room.Name = dto.Name;
            room.Capacity = dto.Capacity;

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();

            return new RoomDto
            {
                Id = room.Id,
                Name = room.Name,
                Capacity = room.Capacity
            };
        }

        public async Task<bool> DeleteRoomAsync(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
                return false;


            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
