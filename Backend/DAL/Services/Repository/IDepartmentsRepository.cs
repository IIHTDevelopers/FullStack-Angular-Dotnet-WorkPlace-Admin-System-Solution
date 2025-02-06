using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagement_API.Models;

namespace Web_API_with_Angular.DAL.Services.Repository
{
    public interface IDepartmentsRepository
    {
        List<Department> GetAllDepartment();
        Task<Department> CreateDepartment(Department package);
        Task<Department> GetDepartmentById(long id);
        Task<bool> DeleteDepartmentById(long id);
        Task<Department> UpdateDepartment(Department model);
        Task<Department> UpdateDepartment(long deptId, Department model);
        Task<Department> GetDepartmentByName(string name);
    }
}
