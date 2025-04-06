using Microsoft.AspNetCore.Mvc;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]

    public class ScreeningController : ControllerBase
    {
        private readonly IScreeningService _screeningService;
        public ScreeningController(IScreeningService screeningService)
        {
            _screeningService = screeningService;
        }
        [HttpGet]
        public async Task<IActionResult> GetScreenings()
        {
            var screenings = await _screeningService.GetScreeningsAsync();
            return Ok(screenings);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetScreeningById(int id)
        {
            var screening = await _screeningService.GetScreeningByIdAsync(id);
            if (screening == null)
                return NotFound();
            return Ok(screening);
        }
        [HttpPost]
        public async Task<IActionResult> CreateScreening([FromBody] ScreeningCreateDto dto)
        {
            var createdScreening = await _screeningService.CreateScreeningAsync(dto);
            return CreatedAtAction(nameof(GetScreeningById), new { id = createdScreening.Id }, createdScreening);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateScreening(int id, [FromBody] ScreeningUpdateDto dto)
        {
            var updatedScreening = await _screeningService.UpdateScreeningAsync(id, dto);
            if (updatedScreening == null)
                return NotFound();
            return Ok(updatedScreening);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScreening(int id)
        {
            var deleted = await _screeningService.DeleteScreeningAsync(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }
    }
    
    
}
