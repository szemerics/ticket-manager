using System.Reflection.Metadata;

namespace TicketManager.DataContext.Entities
{
    public class User : AbstractEntity
    {
        public string? Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Phone { get; set; }
        public List<Order> Orders { get; set; }
        public List<Role> Roles { get; set; }
    }
}