using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        [Authorize(Roles = "Cashier")]
        public async Task<IActionResult> GetOrdersByUserId(int userId)
        {
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);
            return Ok(order);
        }


        [HttpGet]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }



        [HttpPost]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CreateOrderAsync([FromBody] OrderCreateDto orderDto)
        {
            var userId = int.Parse(User.Claims.First(x => x.Type == ClaimTypes.NameIdentifier).Value);

            if (string.IsNullOrEmpty(userId.ToString()))
            {
                return Unauthorized("User ID not found in token.");
            }

            var createdOrder = await _orderService.CreateOrderAsync(orderDto, userId);
            return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrder);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateOrderByAnonymous([FromBody] OrderCreateDto dto, string email, string phone)
        {
            var createdOrder = await _orderService.CreateOrderByAnonymousAsync(dto, email, phone);
            return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrder);
        }


        [HttpPost]
        [Authorize(Roles = "Cashier")]
        public async Task<IActionResult> CreateOrderByCashier([FromBody] OrderCreateDto dto)
        {
            var createdOrder = await _orderService.CreateOrderByCashierAsync(dto);
            return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrder);
        }



        [HttpDelete("{orderId}")]
        [Authorize(Roles = "Cashier,Customer")]
        public async Task<IActionResult> DeleteOrder(int orderId)
        {
            var deleted = await _orderService.DeleteOrderAsync(orderId);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
    
    
}
