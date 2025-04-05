using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketManager.DataContext.Entities
{
    public class Movie : AbstractEntity
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public List<MovieCategory> Category { get; set; }
        public int LengthInMinutes { get; set; }
        public int MinimumAge { get; set; }
        public List<Screening> Screenings { get; set; }
    }
}
