namespace TicketManager.DataContext.Entities
{
    public class Role : AbstractEntity
    {
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}