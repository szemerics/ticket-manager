using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TicketManager.DataContext.Dtos;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieService.GetMoviesAsync();
            return Ok(movies);
        }


        private async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            return Ok(movie);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieDto)
        {
            var movie = await _movieService.CreateMovieAsync(movieDto);
            return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] MovieUpdateDto movieDto)
        {
            var movie = await _movieService.UpdateMovieAsync(id, movieDto);
            return Ok(movie);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var result = await _movieService.DeleteMovieAsync(id);
            if (result)
            {
                return NoContent();
            }
            return NotFound();
        }

    }
}
