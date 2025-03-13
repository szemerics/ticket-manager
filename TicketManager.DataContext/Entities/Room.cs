namespace TicketManager.DataContext.Entities
{
    public class Room : AbstractEntity
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
        public List<Screening> Screenings { get; set; }
        public List<int> Seats { get; set; }
    }
}