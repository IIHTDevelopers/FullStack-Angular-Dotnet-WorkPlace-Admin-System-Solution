using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.Models;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeManagement_API.DAL.Admin
{
    public class EmployeeLoginService : IEmployeeLoginService
    {
        private const string SecretKey = "YourSuperLongSecretKey_ChangeThis123456789"; // Change this to a strong secret key
        private const string Issuer = "techacdemy.com";
        private const string Audience = "https://localhost:44318";
        private readonly ApplicationDbContext _dbContext;
        public EmployeeLoginService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string GenerateJwtToken(string email)
        {
            var key = Encoding.UTF8.GetBytes(SecretKey);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iss, Issuer),
            new Claim(JwtRegisteredClaimNames.Aud, Audience)
        };

            var token = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<EmployeeLogin> ValidateUser(string emailId, string password)
        {
            return await _dbContext.EmployeeLogins
                .FirstOrDefaultAsync(u => u.Email == emailId && u.Password == password);
        }
    }
}