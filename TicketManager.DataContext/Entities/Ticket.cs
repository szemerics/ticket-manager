namespace TicketManager.DataContext.Entities
{
    public enum DiscountType
    {
        Student,
        Senior
    }
    public class Ticket : AbstractEntity
    {
        public decimal Price { get; set; }
        public DiscountType? Discount { get; set; }
        public int ScreeningId { get; set; }
        public Screening Screening { get; set; }
        public User User { get; set; }
    }
}