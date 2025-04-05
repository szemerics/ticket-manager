using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IMovieService
    {
        Task<IEnumerable<Movie>> GetMoviesAsync();
        Task<Movie> GetMovieByIdAsync(int id);
        Task<Movie> AddMovieAsync(Movie movie);
        Task<Movie> UpdateMovieAsync(int id, Movie movie);
        Task<bool> DeleteMovieAsync(int id);
    }

    public class MovieService : IMovieService
    {
        TicketDbContext _context;

        public MovieService(TicketDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Movie>> GetMoviesAsync()
        {
            return _context.Movies.ToList();
        }

        public async Task<Movie> GetMovieByIdAsync(int id)
        {
            return _context.Movies.Find(id);
        }

        public async Task<Movie> AddMovieAsync(Movie movie)
        {
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            return movie;
        }

        public async Task<Movie> UpdateMovieAsync(int id, Movie movie)
        {
            var currentMovie = await _context.Movies.FindAsync(id);
            if (currentMovie == null)
            {
                throw new KeyNotFoundException(message: "Movie not found.");
            }

            _context.Movies.Update(currentMovie);
            await _context.SaveChangesAsync();

            return currentMovie;



        }

        public void DeleteMovieAsync(int id)
        {
            var movie = _context.Movies.Find(id);
            if (movie != null)
            {
                _context.Movies.Remove(movie);
                _context.SaveChanges();
            }
        }
    }
}
