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
        //Task<TicketDto> UpdateTicketAsync(int id, TicketUpdateDto ticket);
        //Task<bool> DeleteTicketAsync(int id);
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


        //public async Task<TicketDto> UpdateTicketAsync(int id, TicketUpdateDto ticketDto)
        //{
        //    var ticket = await _context.Tickets.FindAsync(id);
        //    if (ticket == null)
        //    {
        //        throw new KeyNotFoundException(message: "Ticket not found.");
        //    }

        //    _mapper.Map(ticketDto, ticket);
        //    _context.Tickets.Update(ticket);
        //    await _context.SaveChangesAsync();

        //    return _mapper.Map<TicketDto>(ticket);
        //}

        //public async Task<bool> DeleteTicketAsync(int id)
        //{
        //    var ticket = await _context.Tickets.FindAsync(id);
        //    if (ticket == null)
        //    {
        //        throw new KeyNotFoundException(message: "Ticket not found.");
        //    }

        //    if (ticket.Screening.ScreeningTime < DateTime.Now || ticket.Screening.ScreeningTime.AddHours(-4) > DateTime.Now)
        //    {
        //        _context.Tickets.Remove(ticket);
        //        await _context.SaveChangesAsync();
        //        return true;
        //    }
        //    else
        //    {
        //        throw new TimeoutException("The screening will be starting within 4 hours!");
        //    }

        //}

    }
}
