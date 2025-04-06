using Microsoft.AspNetCore.Mvc;
using TicketManager.DataContext.Dtos;
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
        public async Task<ActionResult<List<SettingDto>>> GetSettings()
        {
            var settings = await _adminService.GetSettingsAsync();

            return Ok(settings);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSettings(UpdateSettingDto setting)
        {
            if (setting == null)
                return BadRequest("Setting cannot be empty.");

            await _adminService.UpdateSettingAsync(setting);
            return Ok(setting);
        }

    }
}
