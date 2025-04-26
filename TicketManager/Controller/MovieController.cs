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

        [HttpGet("{movieId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovieById(int movieId)
        {
            var movie = await _movieService.GetMovieByIdAsync(movieId);
            return Ok(movie);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieDto)
        {
            var movie = await _movieService.CreateMovieAsync(movieDto);
            return CreatedAtAction(nameof(GetMovieById), new { movieId = movie.Id }, movie);
        }

        [HttpPut("{movieId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateMovie(int movieId, [FromBody] MovieUpdateDto movieDto)
        {
            var movie = await _movieService.UpdateMovieAsync(movieId, movieDto);
            return Ok(movie);
        }

        [HttpDelete("{movieId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteMovie(int movieId)
        {
            var result = await _movieService.DeleteMovieAsync(movieId);
            if (result)
            {
                return NoContent();
            }
            return NotFound();
        }

    }
}
