using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<MovieDto>> GetMoviesAsync();
        Task<IEnumerable<MovieCategoryDto>> GetMovieCategories();
        Task<MovieDto> GetMovieByIdAsync(int movieId);
        Task<MovieDto> CreateMovieAsync(MovieCreateDto movie);
        Task<MovieDto> UpdateMovieAsync(int movieId, MovieUpdateDto movie);
        Task<bool> DeleteMovieAsync(int movieId);
    }

    public class MovieService : IMovieService
    {
        TicketDbContext _context;
        IMapper _mapper;

        public MovieService(TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<MovieDto>> GetMoviesAsync()
        {
            var movies = await _context.Movies
                .Include(m => m.Screenings)
                .Where(m => !m.IsDeleted)
                .ToListAsync();

            return _mapper.Map<IEnumerable<MovieDto>>(movies);
        }

        public async Task<MovieDto> GetMovieByIdAsync(int movieId)
        {
            var movie = await _context.Movies
                .Include(m => m.Screenings)
                .Where(m => !m.IsDeleted)
                .FirstOrDefaultAsync(m => m.Id == movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException(message: "Movie not found.");
            }

            return _mapper.Map<MovieDto>(movie);
        }

        public async Task<MovieDto> CreateMovieAsync(MovieCreateDto movieDto)
        {
            var movie = _mapper.Map<Movie>(movieDto);
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return _mapper.Map<MovieDto>(movie);

        }

        public async Task<MovieDto> UpdateMovieAsync(int movieId, MovieUpdateDto movieDto)
        {
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException(message: "Movie not found.");
            }

            _mapper.Map(movieDto, movie);
            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();

            return _mapper.Map<MovieDto>(movie);

        }

        public async Task<bool> DeleteMovieAsync(int movieId)
        {
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
            {
                throw new KeyNotFoundException("Movie not found.");
            }

            // Check if the movie has any screenings
            var screenings = await _context.Screenings
                .Where(s => s.MovieId == movieId)
                .ToListAsync();
            if (screenings.Any())
            {
                throw new InvalidOperationException("Cannot delete a movie that has screenings.");
            }

            movie.IsDeleted = true; // Soft delete
            _context.Movies.Update(movie);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<MovieCategoryDto>> GetMovieCategories()
        {
            var categories = Enum.GetValues(typeof(MovieCategory))
                            .Cast<MovieCategory>()
                            .ToList();

            return _mapper.Map<IEnumerable<MovieCategoryDto>>(categories);
        }
    }
}
