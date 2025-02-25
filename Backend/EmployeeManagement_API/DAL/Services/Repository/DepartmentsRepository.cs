using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EmployeeManagement_API.DAL;
using EmployeeManagement_API.Models;

namespace Web_API_with_Angular.DAL.Services.Repository
{
    public class DepartmentsRepository : IDepartmentsRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public DepartmentsRepository(ApplicationDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task<Department> CreateDepartment(Department department)
        {
            try
            {
                var result = _dbContext.Departments.Add(department);
                await _dbContext.SaveChangesAsync();
                return department;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<bool> DeleteDepartmentById(long id)
        {
            var department = await _dbContext.Departments.FindAsync(id);

            if (department == null)
            {
                throw new Exception("Department not found.");
            }
            try
            {
                _dbContext.Departments.Remove(_dbContext.Departments.Single(a => a.Id == id));
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<Department> GetAllDepartment()
        {
            try
            {
                var result = _dbContext.Departments.ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<Department> GetDepartmentById(long id)
        {
            try
            {
                return await _dbContext.Departments.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public async Task<Department> GetDepartmentByName(string name)
        {
            return await _dbContext.Departments
                .FirstOrDefaultAsync(e => e.Name == name);
        }

        public async Task<Department> UpdateDepartment(Department model)
        {
            var ex = await _dbContext.Departments.FindAsync(model.Id);
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

        public async Task<Department> UpdateDepartment(long deptId, Department model)
        {
            var department = await _dbContext.Departments.FindAsync(deptId);

            if (department == null)
            {
                throw new Exception("Department not found.");
            }
            // Step 2: Custom validation for DepartmentId
            var departmentExists = await _dbContext.Departments.AnyAsync(d => d.Id == model.Id);
            if (!departmentExists)
            {
                throw new Exception("The specified Department ID does not exist.");
            }
            // Update Department fields
            department.Name = model.Name;
            department.Description = model.Description;
            // Update other properties as necessary
            _dbContext.Entry(department).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return department;
        }
    }
}