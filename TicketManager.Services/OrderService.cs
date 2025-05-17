using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
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
        Task<OrderDto> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<bool> DeleteOrderAsync(int orderId);
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

        // Helper methods
        private async Task<Screening> GetScreeningWithRoomAsync(int screeningId)
        {
            var screening = await _context.Screenings
                .Include(s => s.Room)
                .FirstOrDefaultAsync(s => s.Id == screeningId);

            if (screening == null)
                throw new KeyNotFoundException("Screening not found.");

            return screening;
        }

        private async Task<List<Seat>> ReserveSeatsAsync(int screeningId, List<int> seatIds)
        {
            var seats = await _context.Seats
                .Where(s => s.ScreeningId == screeningId && seatIds.Contains(s.Id))
                .ToListAsync();

            foreach (var seatId in seatIds)
            {
                var seat = seats.FirstOrDefault(s => s.Id == seatId);
                if (seat == null)
                    throw new KeyNotFoundException($"Seat not found: {seatId}");
                if (seat.IsReserved)
                    throw new Exception($"Seat already reserved: {seat.Id}");
                seat.IsReserved = true;
            }

            return seats;
        }

        private async Task CalculatePricesAsync(Order order)
        {
            var settings = await _context.Settings.ToListAsync();

            if (settings == null || !settings.Any())
                throw new KeyNotFoundException("Settings not found.");

            var basePrice = decimal.Parse(settings.First(s => s.Key == "BaseScreeningPrice").Value);
            order.TotalPrice = 0;

            foreach (var ticket in order.Tickets)
            {
                decimal discount = 0;
                var key = ticket.Type switch
                {
                    TicketType.Normal => "NormalTicketDiscount",
                    TicketType.Student => "StudentTicketDiscount",
                    TicketType.Senior => "SeniorTicketDiscount",
                    TicketType.Disabled => "DisabledTicketDiscount",
                    TicketType.Early => "EarlyTicketDiscount",
                    _ => "NormalTicketDiscount" // fallback
                };

                var setting = settings.FirstOrDefault(s => s.Key == key);
                if (setting != null)
                {
                    discount = decimal.Parse(setting.Value);
                }

                ticket.Price = basePrice - (basePrice * discount / 100);
                order.TotalPrice += ticket.Price;
            }
        }



        public async Task<OrderDto> CreateOrderAsync(OrderCreateDto orderDto, int userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var screening = await GetScreeningWithRoomAsync(orderDto.ScreeningId);

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                    throw new KeyNotFoundException("User not found.");

                var requestedSeatIds = orderDto.Tickets.Select(t => t.SeatId).ToList();

                await ReserveSeatsAsync(orderDto.ScreeningId, requestedSeatIds);

                // Creating the order
                var order = _mapper.Map<Order>(orderDto);
                order.UserId = userId;
                order.Email = user.Email;
                order.Phone = user.Phone;
                order.PurchaseDate = DateTime.UtcNow;
                order.Tickets = orderDto.Tickets
                    .Select(t =>
                    {
                        var ticket = _mapper.Map<Ticket>(t);
                        ticket.ScreeningId = screening.Id;
                        return ticket;
                    })
                    .ToList();

                // Calculate Total Price
                await CalculatePricesAsync(order);

                // Saving the order commiting the transaction
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

        public async Task<OrderDto> CreateOrderByAnonymousAsync(OrderCreateDto orderDto, string email, string phone)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var screening = await GetScreeningWithRoomAsync(orderDto.ScreeningId);

                // Reserve Seats
                var requestedSeatIds = orderDto.Tickets.Select(t => t.SeatId).ToList();
                await ReserveSeatsAsync(orderDto.ScreeningId, requestedSeatIds);

                // Creating the order
                var order = _mapper.Map<Order>(orderDto);
                order.UserId = null;
                order.Email = email;
                order.Phone = phone;
                order.PurchaseDate = DateTime.UtcNow;
                order.Tickets = orderDto.Tickets
                    .Select(t =>
                    {
                        var ticket = _mapper.Map<Ticket>(t);
                        ticket.ScreeningId = screening.Id;
                        return ticket;
                    })
                    .ToList();

                // Calculate Total Price
                await CalculatePricesAsync(order);

                // Saving the order commiting the transaction
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

        public async Task<OrderDto> CreateOrderByCashierAsync(OrderCreateDto orderDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var screening = await GetScreeningWithRoomAsync(orderDto.ScreeningId);

                // Reserve Seats
                var requestedSeatIds = orderDto.Tickets.Select(t => t.SeatId).ToList();
                await ReserveSeatsAsync(orderDto.ScreeningId, requestedSeatIds);

                // Creating the order
                var order = _mapper.Map<Order>(orderDto);
                order.UserId = null;
                order.Email = null;
                order.Phone = null;
                order.PurchaseDate = DateTime.UtcNow;
                order.Tickets = orderDto.Tickets
                    .Select(t =>
                    {
                        var ticket = _mapper.Map<Ticket>(t);
                        ticket.ScreeningId = screening.Id;
                        return ticket;
                    })
                    .ToList();

                // Calculate Total Price
                await CalculatePricesAsync(order);

                // Saving the order commiting the transaction
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

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Tickets)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                throw new KeyNotFoundException(message: "Order not found.");
            }

            // Unreserve the seats
            var seatIds = order.Tickets.Select(t => t.SeatId).ToList();
            var seats = await _context.Seats
                .Where(s => seatIds.Contains(s.Id))
                .ToListAsync();

            foreach (var seat in seats)
            {
                seat.IsReserved = false;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Screening)
                .ThenInclude(s => s.Movie)
                .Include(o => o.Tickets)
                .ToListAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Screening)
                .ThenInclude(s => s.Movie)
                .Include(o => o.Tickets)
                .ThenInclude(t => t.Seat)
                .FirstOrDefaultAsync(o => o.Id == orderId);
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
                .Include(o => o.Screening)
                .ThenInclude(s => s.Movie)
                .Include(o => o.Tickets)
                .ThenInclude(t => t.Seat)
                .Where(o => o.UserId == userId)
                .ToListAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }
    }
}
