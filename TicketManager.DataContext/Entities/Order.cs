using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketManager.DataContext.Entities
{
    public class Order : AbstractEntity
    {
        public DateTime PurchaseDate { get; set; }
        public decimal TotalPrice { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public List<Ticket> Tickets { get; set; }
    }
}
