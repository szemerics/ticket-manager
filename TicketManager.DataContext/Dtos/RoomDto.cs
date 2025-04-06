using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Entities;

namespace TicketManager.DataContext.Dtos
{
    public class RoomDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public List<DateTime> ScreeningTime { get; set; }
        public List<int> Seats { get; set; }

    }

    public class RoomCreateDto
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
    }

    public class RoomUpdateDto
    {
        public string Name { get; set; }
        public int Capacity { get; set; }
    }
}
