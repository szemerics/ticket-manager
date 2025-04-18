using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class SeatDto
    {
        public int Id { get; set; }

        public int ScreeningId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public bool IsReserved { get; set; }


    }
}
