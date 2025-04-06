using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketManager.DataContext.Entities
{
    public enum MovieCategory
    {
        Action,
        Adventure,
        Animation,
        Biography,
        Comedy,
        Crime,
        Documentary,
        Drama,
        Family,
        Fantasy,
        FilmNoir,
        History,
        Horror,
        Music,
        Musical,
        Mystery,
        Romance,
        SciFi,
        Short,
        Sport,
        Superhero,
        Thriller,
        War,
        Western
    }

    public class Movie : AbstractEntity
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public int LengthInMinutes { get; set; }
        public int MinimumAge { get; set; }

        public List<MovieCategory> Categories { get; set; }
        public List<Screening> Screenings { get; set; }
    }
}
