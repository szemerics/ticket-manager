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
        public decimal TicketPrice { get; set; }
        public TicketType? Type { get; set; }
        public int ScreeningId { get; set; }
        public Screening Screening { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}