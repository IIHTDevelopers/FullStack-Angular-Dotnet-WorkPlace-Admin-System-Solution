using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Services.Repository
{
    public interface IEmployeesRepository
    {
        List<Employee> GetAllEmployee();
        Task<Employee> CreateEmployee(Employee package);
        Task<Employee> GetEmployeeById(long id);
        Task<bool> DeleteEmployeeById(long id);
        Task<Employee> UpdateEmployee(Employee model);
        Task<Employee> UpdateEmployee(long empId, Employee model);
        Task<IEnumerable<Employee>> GetEmployeesByDepartment(int departmentId);
    }
}
