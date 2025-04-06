using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;

namespace TicketManager.Services
{
    public interface IAdminService
    {
        Task<List<SettingDto>> GetSettingsAsync();
        Task<SettingDto> UpdateSettingAsync(UpdateSettingDto settingDtos);
    }
    public class AdminService : IAdminService
    {
        private TicketDbContext _context;
        private IMapper _mapper;
        public AdminService (TicketDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<SettingDto>> GetSettingsAsync()
        {
            var settings = await _context.Settings.ToListAsync();

            return _mapper.Map<List<SettingDto>>(settings);
        }

        public async Task<SettingDto> UpdateSettingAsync(UpdateSettingDto settingDto)
        {
            var setting = await _context.Settings.FindAsync(settingDto.Id);

            if (setting != null)
            {
                setting.Value = settingDto.Value;
            }
            await _context.SaveChangesAsync();

            return _mapper.Map<SettingDto>(setting);
        }
    }
}
