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
        public UserDto User { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public List<int> TicketIds { get; set; }
    }
}
