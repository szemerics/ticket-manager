namespace TicketManager.DataContext.Entities
{
    public class Room : AbstractEntity
    {
        public string Name { get; set; }
        public int RowNumber { get; set; }
        public int ColumnNumber { get; set; }


        public List<Screening> Screenings { get; set; }
    }
}