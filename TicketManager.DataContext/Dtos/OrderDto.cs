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
        public UserDto? User { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<TicketDto> Tickets { get; set; }
    }
    public class OrderCreateDto
    {
        public List<int> TicketIds { get; set; }
    }
}
