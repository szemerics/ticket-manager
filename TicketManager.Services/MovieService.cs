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
        List<Movie> GetMovies();
    }
    public class MovieService : IMovieService
    {
        TicketDbContext _context;

        public MovieService(TicketDbContext context)
        {
            _context = context;
        }
        public List<Movie> GetMovies()
        {
            return _context.Movies.ToList();
        }

    }
}
