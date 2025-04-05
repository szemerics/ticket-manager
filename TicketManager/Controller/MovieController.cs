using Microsoft.AspNetCore.Mvc;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;
        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _movieService.GetMoviesAsync();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieService.GetMovieByIdAsync(id);
            return Ok(movie);
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateMovie([FromBody] MovieCreateDto movieDto)
        //{
        //    var movie = await _movieService.CreateMovieAsync(movieDto);
        //    return CreatedAtAction(nameof(GetMovieById), new { id = movie.Id }, movie);
        //}

    }
}
