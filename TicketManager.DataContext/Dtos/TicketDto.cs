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
        public int Id { get; set; }
        public decimal Price { get; set; }
        public TicketType? Type { get; set; }
        public ScreeningDto Screening { get; set; }
        public int OrderId { get; set; }
    }

    public class TicketCreateDto
    {
        public TicketType? Type { get; set; }
        public int ScreeningId { get; set; }
        public int OrderId { get; set; }
    }

    public class TicketUpdateDto
    {
        public int ScreeningId { get; set; }
        public int OrderId { get; set; }
    }
}
