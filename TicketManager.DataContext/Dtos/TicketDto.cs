using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class TicketDto
    {
        public decimal Price { get; set; }
        public TicketType? Type { get; set; }
        public int OrderId { get; set; }
        public int SeatId { get; set; }


        public Order Order { get; set; }
        public Seat Seat { get; set; }
    }

    public class TicketCreateDto
    {
        public TicketType Type { get; set; }
        public int SeatId { get; set; }
    }

    public class TicketUpdateDto
    {
        //public TicketType Type { get; set; }
        public int SeatId { get; set; }
    }

    public class OrderTicketDto
    {
        public decimal Price { get; set; }
        public TicketType? Type { get; set; }



        public OrderSeatDto Seat { get; set; }
    }
}
