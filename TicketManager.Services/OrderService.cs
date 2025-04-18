using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(OrderCreateDto orderDto, int userId);
        Task<OrderDto> CreateOrderByCashierAsync(OrderCreateDto orderDto);
        Task<OrderDto> CreateOrderByAnonymousAsync(OrderCreateDto orderDto, string email, string phone);
        Task<OrderDto> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<bool> DeleteOrderAsync(int id);
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId);
    }
    public class OrderService : IOrderService
    {
        private readonly TicketDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<OrderDto> CreateOrderAsync(OrderCreateDto orderDto, int userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var screening = await _context.Screenings
                    .Include(s => s.Room)
                    .FirstOrDefaultAsync(s => s.Id == orderDto.ScreeningId);

                if (screening == null)
                {
                    throw new KeyNotFoundException(message: "Screening not found.");
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    throw new KeyNotFoundException("User not found.");




                var requestedSeatIds = orderDto.Tickets.Select(t => t.SeatId).ToList();
                var seats = await _context.Seats
                    .Where(s => s.ScreeningId == orderDto.ScreeningId && requestedSeatIds.Contains(s.Id))
                    .ToListAsync();

                foreach (var seatId in requestedSeatIds)
                {
                    var seat = seats.FirstOrDefault(s => s.Id == seatId);
                    if (seat == null)
                        throw new KeyNotFoundException($"Seat not found: {seatId}");
                    if (seat.IsReserved)
                        throw new Exception($"Seat already reserved: {seat.Id}");
                    seat.IsReserved = true;
                }

                var order = _mapper.Map<Order>(orderDto);
                order.UserId = userId;
                order.Email = user.Email;
                order.Phone = user.Phone;
                order.PurchaseDate = DateTime.UtcNow;
                order.Tickets = orderDto.Tickets
                    .Select(t =>
                    {
                        var ticket = _mapper.Map<Ticket>(t);
                        ticket.ScreeningId = screening.Id; // Beállítjuk a ScreeningId-t
                        return ticket;
                    })
                    .ToList();



                var settings = await _context.Settings.ToListAsync();


                if (settings == null || !settings.Any())
                {
                    throw new KeyNotFoundException(message: "Settings not found.");
                }
                else
                {
                    var basePrice = decimal.Parse(settings.First(s => s.Key == "BaseScreeningPrice").Value);

                    order.TotalPrice = 0;

                    foreach (var ticket in order.Tickets)
                    {
                        decimal discount = 0;

                        if (ticket.Type == TicketType.Normal)
                            discount = decimal.Parse(settings.First(s => s.Key == "NormalTicketDiscount").Value);
                        else if (ticket.Type == TicketType.Student)
                            discount = decimal.Parse(settings.First(s => s.Key == "StudentTicketDiscount").Value);
                        else if (ticket.Type == TicketType.Senior)
                            discount = decimal.Parse(settings.First(s => s.Key == "SeniorTicketDiscount").Value);
                        else if (ticket.Type == TicketType.Disabled)
                            discount = decimal.Parse(settings.First(s => s.Key == "DisabledTicketDiscount").Value);
                        else if (ticket.Type == TicketType.Early)
                            discount = decimal.Parse(settings.First(s => s.Key == "EarlyTicketDiscount").Value);

                        ticket.Price = basePrice - (basePrice * discount / 100);
                        order.TotalPrice += ticket.Price;
                    }
                }

                

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return _mapper.Map<OrderDto>(order);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new Exception("Error creating order", ex);
            }
        }

                //public async Task<OrderDto> CreateOrderAsync(OrderCreateDto orderDto, int userId)
                //{
                //    var order = _mapper.Map<Order>(orderDto);
                //    order.UserId = userId;
                //    await _context.Orders.AddAsync(order);
                //    await _context.SaveChangesAsync();

                //    var savedOrder = await _context.Orders
                //        .Include(o => o.User)
                //        .Include(o => o.Tickets)
                //        .FirstOrDefaultAsync(o => o.Id == order.Id);


                //    return _mapper.Map<OrderDto>(savedOrder);
                //}

                public async Task<OrderDto> CreateOrderByAnonymousAsync(OrderCreateDto orderDto, string email, string phone)
                {
                    var order = _mapper.Map<Order>(orderDto);
                    order.Email = email;
                    order.Phone = phone;
                    await _context.Orders.AddAsync(order);
                    await _context.SaveChangesAsync();

                    var savedOrder = await _context.Orders
                        .Include(o => o.Tickets)
                        .FirstOrDefaultAsync(o => o.Id == order.Id);


                    return _mapper.Map<OrderDto>(savedOrder);
                }

        public async Task<OrderDto> CreateOrderByCashierAsync(OrderCreateDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var savedOrder = await _context.Orders
                .Include(o => o.Tickets)
                .FirstOrDefaultAsync(o => o.Id == order.Id);


            return _mapper.Map<OrderDto>(savedOrder);
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                throw new KeyNotFoundException(message: "Order not found.");
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Tickets)
                .ToListAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Tickets)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                throw new KeyNotFoundException(message: "Order not found.");
            }
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Tickets)
                .Where(o => o.UserId == userId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }
    }
}
