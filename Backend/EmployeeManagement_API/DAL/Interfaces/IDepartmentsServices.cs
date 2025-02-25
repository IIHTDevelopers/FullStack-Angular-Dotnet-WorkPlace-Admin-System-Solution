using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Interfaces
{
    public interface IDepartmentsServices
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
