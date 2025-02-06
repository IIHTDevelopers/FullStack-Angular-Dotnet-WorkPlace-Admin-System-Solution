using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace EmployeeManagement_API.Controllers
{
    [AuthFilter]
    [RoutePrefix("api/employees")]
    public class EmployeesController : ApiController
    {
        private readonly IEmployeeService _service;
        public EmployeesController()
        {
        }
        public EmployeesController(IEmployeeService service)
        {
            _service = service;
        }
        [HttpGet]
        [Route("{id:long}")]
        public async Task<IHttpActionResult> GetEmployeesId(long id)
        {
            var employee = await _service.GetEmployeeById(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }
        [HttpPost]
        [Route("employees")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> CreateEmployees([FromBody] Employee model)
        {
            var empExists = await _service.GetEmployeeById(model.Id);
            var result = await _service.CreateEmployee(model);
            return Ok(new Response { Status = "Success", Message = "Employee created successfully!" });
        }
        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<IHttpActionResult> UpdateEmployee([FromBody] Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _service.UpdateEmployee(model);
                return Ok(new Response { Status = "Success", Message = "Employee updated successfully!" });
            }
            catch (Exception ex)
            {
                // Handle errors and send a response with the exception message
                return InternalServerError(new Exception($"Error: {ex.Message}"));
            }
        }
        [HttpDelete]
        [Route("DeleteEmployee")]
        public async Task<IHttpActionResult> DeleteEmployee(long id)
        {
            var result = await _service.DeleteEmployeeById(id);
            return Ok(new Response { Status = "Success", Message = "Employee deleted successfully!" });
        }

        [HttpPut]
        [Route("UpdateEmployee/{empId}")]
        public async Task<IHttpActionResult> UpdateEmployee(long empId, [FromBody] Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (model == null)
            {
                return BadRequest("Invalid employee data.");
            }

            try
            {
                // Call the service to update the employee by EmployeeId
                var result = await _service.UpdateEmployee(empId, model);

                // Return success message
                return Ok(new Response { Status = "Success", Message = "Employee updated successfully!" });
            }
            catch (Exception ex)
            {
                // Handle errors and send a response with the exception message
                return InternalServerError(new Exception($"Error: {ex.Message}"));
            }
        }
        [HttpGet]
        [Route("GetEmployeesByDepartment/{departmentId}")]
        public async Task<IHttpActionResult> GetEmployeesByDepartment(int departmentId)
        {
            if (departmentId <= 0)
            {
                return BadRequest("Invalid department ID.");
            }

            try
            {
                // Call the service to get employees by department
                var employees = await _service.GetEmployeesByDepartment(departmentId);

                if (employees == null || !employees.Any())
                {
                    return NotFound();
                }

                return Ok(employees);
            }
            catch (Exception ex)
            {
                // Handle errors and send a response with the exception message
                return InternalServerError(new Exception($"Error: {ex.Message}"));
            }
        }
        [HttpGet]
        [Route("GetAllEmployee")]
        public IEnumerable<Employee> GetAllEmployee()
        {
            return _service.GetAllEmployee();
        }
    }
}