using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicketManager.DataContext.Entities
{
    public class Setting : AbstractEntity
    {
        // Setting Name
        public string? Key { get; set; }
        // Setting Value
        public string? Value { get; set; }
    }
}
