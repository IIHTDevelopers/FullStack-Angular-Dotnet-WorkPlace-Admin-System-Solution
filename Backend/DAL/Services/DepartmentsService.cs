using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.DAL.Interfaces;
using Web_API_with_Angular.DAL.Services.Repository;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Services
{
    public class DepartmentsService : IDepartmentsServices
    {
        private readonly IDepartmentsRepository _repository;
        public DepartmentsService(IDepartmentsRepository repository)
        {
            _repository = repository;
        }
        public Task<Department> CreateDepartment(Department department)
        {
            return _repository.CreateDepartment(department);
        }

        public Task<bool> DeleteDepartmentById(long id)
        {
            return _repository.DeleteDepartmentById(id);
        }

        public List<Department> GetAllDepartment()
        {
           return _repository.GetAllDepartment();
        }

        public Task<Department> GetDepartmentById(long id)
        {
            return _repository.GetDepartmentById(id);
        }

        public Task<Department> GetDepartmentByName(string name)
        {
            return _repository.GetDepartmentByName(name);
        }

        public Task<Department> UpdateDepartment(Department model)
        {
            return _repository.UpdateDepartment(model);
        }

        public async Task<Department> UpdateDepartment(long deptId, Department model)
        {
            return await _repository.UpdateDepartment(deptId, model);
        }
    }
}