using Microsoft.AspNetCore.Mvc;
using TicketManager.Services;

namespace TicketManager.Controller
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController (IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBaseScreeningPrice()
        {
            var price = await _adminService.GetBaseScreeningPriceAsync();

            return Ok(price);
        }

        [HttpPost]
        public async Task<IActionResult> SetBaseScreeningPrice(decimal newPrice)
        {
            await _adminService.SetBaseScreeningPriceAsync(newPrice);
            return Ok(new { message = "Base screening price updated successfully." });
        }

    }
}
