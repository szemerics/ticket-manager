using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{

    public class ScreeningDto
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public DateTime ScreeningTime { get; set; }
        public decimal ScreeningPrice { get; set; }
        public int RoomId { get; set; }

        public List<SeatDto> Seats { get; set; }
        //public List<Ticket> Tickets { get; set; }
    }
    public class  MovieScreeningDto
    {
        public DateTime ScreeningTime { get; set; }
    }

    public class ScreeningCreateDto
    {
        public int MovieId { get; set; }
        public decimal? ScreeningPrice { get; set; }
        public DateTime ScreeningTime { get; set; }
        public int RoomId { get; set; }
    }
    public class ScreeningUpdateDto
    {
        public int MovieId { get; set; }
        public DateTime ScreeningTime { get; set; }
        public int RoomId { get; set; }
    }
}
