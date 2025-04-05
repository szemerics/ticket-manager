﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public List<MovieCategory> Categories { get; set; }
        public int LengthInMinutes { get; set; }
        public int MinimumAge { get; set; }
        public List<ScreeningDto> Screenings { get; set; }
    }


    public class MovieCreateDto
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public List<int> CategoryIds { get; set; }
        public int LengthInMinutes { get; set; }
        public int MinimumAge { get; set; }
    }

    public class MovieUpdateDto
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public List<int> CategoryIds { get; set; }
        public int LengthInMinutes { get; set; }
        public int MinimumAge { get; set; }
    }
}
