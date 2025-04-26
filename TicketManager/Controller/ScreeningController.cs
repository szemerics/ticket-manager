using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]

    public class ScreeningController : ControllerBase
    {
        private readonly IScreeningService _screeningService;

        public ScreeningController(IScreeningService screeningService)
        {
            _screeningService = screeningService;
        }


        [HttpGet("{screeningId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetScreeningById(int screeningId)
        {
            var screening = await _screeningService.GetScreeningByIdAsync(screeningId);
            if (screening == null)
                return NotFound();
            return Ok(screening);
        }


        [HttpGet("{movieId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetScreeningsByMovieId (int movieId)
        {
            var screenings = await _screeningService.GetScreeningByMovieIdAsync(movieId);
            if (screenings == null)
                return NotFound();
            return Ok(screenings);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateScreening([FromBody] ScreeningCreateDto dto)
        {
            var createdScreening = await _screeningService.CreateScreeningAsync(dto);
            return CreatedAtAction(nameof(GetScreeningById), new { screeningId = createdScreening.Id }, createdScreening);
        }

        [HttpPut("{screeningId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateScreening(int screeningId, [FromBody] ScreeningUpdateDto dto)
        {
            var updatedScreening = await _screeningService.UpdateScreeningAsync(screeningId, dto);
            if (updatedScreening == null)
                return NotFound();
            return Ok(updatedScreening);
        }

        [HttpDelete("{screeningId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteScreening(int screeningId)
        {
            var deleted = await _screeningService.DeleteScreeningAsync(screeningId);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
    
    
}
