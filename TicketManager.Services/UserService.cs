using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using TicketManager.DataContext.Context;
using TicketManager.DataContext.Dtos;
using TicketManager.DataContext.Entities;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Globalization;
using Microsoft.Extensions.Configuration;

namespace TicketManager.Services
{
    public interface IUserService
    {

        // Admin functions
        Task<IEnumerable<UserDto>> GetUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<bool> DeleteUserAsync(int id);
        Task<UserDto> UpdateUserAsync(int id, UserUpdateDto dto);

        // Client functions
        Task<UserDto> RegisterAsync(UserRegisterDto userDto);
        Task<string> LoginAsync(UserLoginDto userDto);
        
        
    }

    public class UserService : IUserService
    {
        private readonly TicketDbContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserService(TicketDbContext context, IMapper mapper
           , IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> RegisterAsync(UserRegisterDto userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            user.Roles = new List<Role>();

            if (userDto.RolesIds != null)
            {
                foreach (var roleId in userDto.RolesIds)
                {
                    var role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == roleId);
                    if (role != null)
                    {
                        user.Roles.Add(role);
                    }
                }
            }

            if (!user.Roles.Any())
            {
                var defaultRole = await GetDefaultCustomerAsync();
                user.Roles.Add(defaultRole); // "Customer" role
            }

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        private async Task<Role> GetDefaultCustomerAsync()
        {
            var defaultRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Customer");
            if (defaultRole == null)
            {
                defaultRole = new Role { Name = "Customer" };
                await _context.Roles.AddAsync(defaultRole);
                await _context.SaveChangesAsync();
            }
            return defaultRole;
        }

        public async Task<string> LoginAsync (UserLoginDto userDto)
        {
            var user = await _context.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials.");

            return await GenerateTokenAsync(user);
        }

        private async Task<string> GenerateTokenAsync(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["Jwt:ExpireDays"]));

            var claims = await GetClaimsIdentity(user);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims.Claims, expires: expires, signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Sid, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.AuthTime, DateTime.Now.ToString()) // CultureInfo.InvariantCulture (?)
            };

            if (user.Roles.Any())
            {
                claims.AddRange(user.Roles.Select(role => new Claim("roleIds", Convert.ToString(role.Id))));
                claims.AddRange(user.Roles.Select(role => new Claim(ClaimTypes.Role, role.Name)));
            }

            return new ClaimsIdentity(claims, "Token");
        }



        public async Task<UserDto> UpdateUserAsync(int id, UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return null;

            _mapper.Map(dto, user);
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
