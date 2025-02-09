using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.Models;

namespace EmployeeManagement_API.DAL.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeesRepository _repository;
        public EmployeeService(IEmployeesRepository repository) 
        {
            _repository = repository;
        }
        public Task<Employee> CreateEmployee(Employee employee)
        {
            return _repository.CreateEmployee(employee);
        }

        public Task<bool> DeleteEmployeeById(long id)
        {
            return _repository.DeleteEmployeeById(id);
        }

        public List<Employee> GetAllEmployee()
        {
            return _repository.GetAllEmployee();
        }

        public Task<Employee> GetEmployeeById(long id)
        {
            return (_repository.GetEmployeeById(id));
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByDepartment(int departmentId)
        {
            return await _repository.GetEmployeesByDepartment(departmentId);
        }

        public Task<Employee> UpdateEmployee(Employee model)
        {
            return _repository.UpdateEmployee(model);
        }

        public Task<Employee> UpdateEmployee(long empId, Employee model)
        {
            return _repository.UpdateEmployee(empId, model);
        }
    }
}