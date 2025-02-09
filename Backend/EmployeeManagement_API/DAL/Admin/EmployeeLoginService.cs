using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Admin
{
    public class EmployeeLoginService : IEmployeeLoginService
    {
        private readonly ApplicationDbContext _dbContext;
        public EmployeeLoginService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<EmployeeLogin> ValidateUser(string emailId, string password)
        {
            return await _dbContext.EmployeeLogins
                .FirstOrDefaultAsync(u => u.Email == emailId && u.Password == password);
        }
    }
}