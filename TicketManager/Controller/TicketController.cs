using Microsoft.AspNetCore.Mvc;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateTicket(int id, [FromBody] TicketUpdateDto dto)
        //{
        //    var updatedTicket = await _ticketService.UpdateTicketAsync(id, dto);
        //    if (updatedTicket == null)
        //        return NotFound();
        //    return Ok(updatedTicket);
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTicket(int id)
        //{
        //    var result = await _ticketService.DeleteTicketAsync(id);
        //    if (!result)
        //        return NotFound();
        //    return NoContent();
        //}
    }
}
