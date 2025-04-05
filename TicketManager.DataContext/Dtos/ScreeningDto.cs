using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class ScreeningDto
    {
        public int Id { get; set; }
        public string MovieTitle { get; set; }
        public DateTime ScreeningTime { get; set; }
        public string RoomName { get; set; }
    }
}
