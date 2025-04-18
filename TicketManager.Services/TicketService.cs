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
        //Task<IEnumerable<TicketDto>> GetTicketsAsync();
        //Task<TicketDto> GetTicketByIdAsync(int id);
        //Task<TicketDto> CreateTicketAsync(TicketCreateDto ticket);
        Task<TicketDto> UpdateTicketAsync(int id, TicketUpdateDto ticket);
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


        //public async Task<IEnumerable<TicketDto>> GetTicketsAsync()
        //{
        //    var tickets = await _context.Tickets
        //        .Include(t => t.Order)
        //        .Include(t => t.Screening)
        //            .ThenInclude(s => s.Movie)
        //        .Include(t => t.Screening)
        //            .ThenInclude(s => s.Room)
        //        .ToListAsync();

        //    return _mapper.Map<IEnumerable<TicketDto>>(tickets);
        //}


        //public async Task<TicketDto> GetTicketByIdAsync(int id)
        //{
        //    var ticket = await _context.Tickets
        //        .Include(t => t.Order)
        //        .Include(t => t.Screening)
        //            .ThenInclude(s => s.Movie)
        //        .Include(t => t.Screening)
        //            .ThenInclude(s => s.Room)
        //        .FirstOrDefaultAsync(t => t.Id == id);

        //    if (ticket == null)
        //    {
        //        throw new KeyNotFoundException("Ticket not found.");
        //    }

        //    return _mapper.Map<TicketDto>(ticket);
        //}


        private decimal GetDiscountValue(List<Setting> settings, string key)
        {
            var setting = settings.FirstOrDefault(s => s.Key == key);
            if (setting != null && decimal.TryParse(setting.Value, out decimal discount))
            {
                return discount;
            }

            return 0;
        }

        //public async Task<TicketDto> CreateTicketAsync(TicketCreateDto ticketDto)
        //{
        //    var settings = await _context.Settings.ToListAsync();
        //    decimal discount = 0;

        //    switch (ticketDto.Type)
        //    {
        //        case TicketType.Student:
        //            discount = GetDiscountValue(settings, "StudentTicketDiscount");
        //            break;
        //        case TicketType.Senior:
        //            discount = GetDiscountValue(settings, "SeniorTicketDiscount");
        //            break;
        //        case TicketType.Disabled:
        //            discount = GetDiscountValue(settings, "DisabledTicketDiscount");
        //            break;
        //        case TicketType.Early:
        //            discount = GetDiscountValue(settings, "EarlyTicketDiscount");
        //            break;
        //        case TicketType.Normal:
        //            discount = GetDiscountValue(settings, "NormalTicketDiscount");
        //            break;
        //    }

        //    var ticket = _mapper.Map<Ticket>(ticketDto);

        //    var screening = await _context.Screenings
        //        .FirstOrDefaultAsync(s => s.Id == ticketDto.ScreeningId);

        //    if (screening == null)
        //        throw new Exception("Screening not found.");

        //    ticket.TicketPrice = screening.ScreeningPrice * (1 - discount / 100);

        //    await _context.Tickets.AddAsync(ticket);
        //    await _context.SaveChangesAsync();

        //    var createdTicket = await _context.Tickets
        //        .Include(t => t.Screening).ThenInclude(s => s.Movie)
        //        .Include(t => t.Screening).ThenInclude(s => s.Room)
        //        .Include(t => t.Order)
        //        .FirstOrDefaultAsync(t => t.Id == ticket.Id);

        //    return _mapper.Map<TicketDto>(createdTicket);

        //}


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
