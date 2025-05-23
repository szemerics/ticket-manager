﻿using Microsoft.AspNetCore.Authorization;
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


        [HttpGet("{roomId}")]
        public async Task<IActionResult> GetRoomById(int roomId)
        {
            var room = await _roomService.GetRoomByIdAsync(roomId);
            if (room == null)
                return NotFound();
            return Ok(room);
        }


        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomCreateDto dto)
        {
            var createdRoom = await _roomService.CreateRoomAsync(dto);
            return CreatedAtAction(nameof(GetRoomById), new { roomId = createdRoom.Id }, createdRoom);
        }

        [HttpPut("{roomId}")]
        public async Task<IActionResult> UpdateRoom(int roomId, [FromBody] RoomUpdateDto dto)
        {
            var updatedRoom = await _roomService.UpdateRoomAsync(roomId, dto);
            if (updatedRoom == null)
                return NotFound();
            return Ok(updatedRoom);
        }

        [HttpDelete("{roomId}")]
        public async Task<IActionResult> DeleteRoom(int roomId)
        {
            var deleted = await _roomService.DeleteRoomAsync(roomId);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
}
