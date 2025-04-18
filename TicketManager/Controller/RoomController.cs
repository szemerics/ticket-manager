using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize(Roles = "Admin")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomController(IRoomService roomService)
        {
            _roomService = roomService;
        }


        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomCreateDto dto)
        {
            var createdRoom = await _roomService.CreateRoomAsync(dto);
            return CreatedAtAction(nameof(_roomService.GetRoomByIdAsync), new { id = createdRoom.Id }, createdRoom);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] RoomUpdateDto dto)
        {
            var updatedRoom = await _roomService.UpdateRoomAsync(id, dto);
            if (updatedRoom == null)
                return NotFound();
            return Ok(updatedRoom);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var deleted = await _roomService.DeleteRoomAsync(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
