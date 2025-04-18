using System.Text.Json.Serialization;

namespace TicketManager.DataContext.Entities
{
    public enum TicketType
    {
        Normal,
        Student,
        Senior,
        Disabled,
        Early
    }
    public class Ticket : AbstractEntity
    {
        public decimal Price { get; set; }
        public TicketType? Type { get; set; }
        public int OrderId { get; set; }
        public int SeatId { get; set; }



        public Order Order { get; set; }
        public Seat Seat { get; set; }
    }
}