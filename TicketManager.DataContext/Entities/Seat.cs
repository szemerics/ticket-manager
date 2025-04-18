namespace TicketManager.DataContext.Entities
{
    public class Seat : AbstractEntity
    {
        public int ScreeningId { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public bool IsReserved { get; set; }

        
        public Screening Screening { get; set; }
    }
}