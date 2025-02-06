using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Admin
{
    public interface IEmployeeLoginService
    {
        Task<EmployeeLogin> ValidateUser(string emailId, string password);
    }
}
