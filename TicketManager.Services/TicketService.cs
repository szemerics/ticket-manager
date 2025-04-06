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
    public interface ITicketService
    {
        Task<IEnumerable<TicketDto>> GetTicketsAsync();
        Task<TicketDto> GetTicketByIdAsync(int id);
        Task<TicketDto> CreateTicketAsync(TicketCreateDto ticket);
        Task<TicketDto> UpdateTicketAsync(int id, TicketUpdateDto ticket);
        Task<bool> DeleteTicketAsync(int id);
    }

    public class TicketService : ITicketService
    {
        private TicketDbContext _context;
        private IMapper _mapper;

        public TicketService(TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<IEnumerable<TicketDto>> GetTicketsAsync()
        {
            var tickets = await _context.Tickets.ToListAsync();
            return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        }

        public async Task<TicketDto> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                throw new KeyNotFoundException(message: "Ticket not found.");
            }
            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<TicketDto> CreateTicketAsync(TicketCreateDto ticketDto)
        {
            var ticket = _mapper.Map<Ticket>(ticketDto);
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<TicketDto> UpdateTicketAsync(int id, TicketUpdateDto ticketDto)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                throw new KeyNotFoundException(message: "Ticket not found.");
            }

            _mapper.Map(ticketDto, ticket);
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();

            return _mapper.Map<TicketDto>(ticket);
        }

        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                throw new KeyNotFoundException(message: "Ticket not found.");
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
