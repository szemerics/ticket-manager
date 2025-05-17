using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal TotalPrice { get; set; }
        public int ScreeningId { get; set; }
        public ScreeningDto Screening { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }

        public required List<OrderTicketDto> Tickets { get; set; }
    }
    public class OrderCreateDto
    {
        public int ScreeningId { get; set; }
        public List<TicketCreateDto> Tickets { get; set; }
    }
}
