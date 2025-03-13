namespace TicketManager.DataContext.Entities
{
    public class Screening : AbstractEntity
    {
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public DateTime ScreeningTime { get; set; }
        public List<Ticket> Tickets { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }
}