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
            var order = _mapper.Map<Order>(orderDto);
            order.UserId = userId;
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();

            var savedOrder = await _context.Orders
                .Include(o => o.User)
                .Include(o => o.Tickets)
                .FirstOrDefaultAsync(o => o.Id == order.Id);


            return _mapper.Map<OrderDto>(savedOrder);
        }

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
