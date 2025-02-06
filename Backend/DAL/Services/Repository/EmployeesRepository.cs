using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.DAL;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.Models;

namespace Web_API_with_Angular.DAL.Services.Repository
{
    public class EmployeesRepository : IEmployeesRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public EmployeesRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            try
            {
                var result = _dbContext.Employees.Add(employee);
                await _dbContext.SaveChangesAsync();
                return employee;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<bool> DeleteEmployeeById(long id)
        {
            try
            {
                _dbContext.Employees.Remove(_dbContext.Employees.Single(a => a.Id == id));
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<Employee> GetAllEmployee()
        {
            try
            {
                var result = _dbContext.Employees.ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<Employee> GetEmployeeById(long id)
        {
            try
            {
                return await _dbContext.Employees.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByDepartment(int departmentId)
        {
            var employees = await _dbContext.Employees
                                       .Where(e => e.DepartmentId == departmentId)
                                       .ToListAsync();

            return employees;
        }

        public async Task<Employee> UpdateEmployee(Employee model)
        {
            var ex = await _dbContext.Employees.FindAsync(model.Id);

            if (ex == null)
            {
                throw new Exception("Employee not found.");
            }
            // Step 2: Custom validation for DepartmentId
            var departmentExists = await _dbContext.Departments.AnyAsync(d => d.Id == model.DepartmentId);
            if (!departmentExists)
            {
                throw new Exception("The specified Department ID does not exist.");
            }
            try
            {
                await _dbContext.SaveChangesAsync();
                return ex;
            }
            catch (Exception exc)
            {
                throw (exc);
            }
        }

        public async Task<Employee> UpdateEmployee(long empId, Employee model)
        {
            var employee = await _dbContext.Employees.FindAsync(empId);

            if (employee == null)
            {
                throw new Exception("Employee not found.");
            }
            // Step 2: Custom validation for DepartmentId
            var empExists = await _dbContext.Departments.AnyAsync(d => d.Id == model.DepartmentId);
            if (!empExists)
            {
                throw new Exception("The specified Department ID does not exist.");
            }
            // Update employee fields
            employee.Name = model.Name;
            employee.Email = model.Email;
            employee.Position = model.Position;
            employee.Salary = model.Salary;
            employee.DepartmentId = model.DepartmentId;
            // Update other properties as necessary
            _dbContext.Entry(employee).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return employee;
        }
    }
}