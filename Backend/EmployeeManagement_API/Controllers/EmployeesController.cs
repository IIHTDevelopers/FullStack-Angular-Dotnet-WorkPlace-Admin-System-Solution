using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace EmployeeManagement_API.Controllers
{
    /// <summary>
    /// [AuthFilter] applied for validation before access this api must get token
    /// </summary>
    [Authorize]
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
        /// <summary>
        /// Get Employee by Emp ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:long}")]
        public async Task<IHttpActionResult> GetEmployeesId(long id)
        {
            var employee = await _service.GetEmployeeById(id);
            if (employee == null)
                return BadRequest("Invalid Employee ID");
            return Ok(employee);
        }
        /// <summary>
        /// Create Employee by passing employee model.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("createemployees")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> CreateEmployees([FromBody] Employee model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var empExists = await _service.GetEmployeeById(model.Id);
            if (empExists != null)
            {
                return BadRequest("Invalid Employee ID its exists.");
            }
            var result = await _service.CreateEmployee(model);
            return Ok(new Response { Status = "Success", Message = "Employee created successfully!" });
        }
        /// <summary>
        /// UpdateEmployee by passing employee model only
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("updateemployee")]
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
        /// <summary>
        /// DeleteEmployee by passing employeeID only
        /// </summary>
        /// <param name="empId"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("deleteemployee/{empId}")]
        public async Task<IHttpActionResult> DeleteEmployee(long empId)
        {
            var result = await _service.DeleteEmployeeById(empId);
            return Ok(new Response { Status = "Success", Message = "Employee deleted successfully!" });
        }
        /// <summary>
        /// UpdateEmployee by passing employeeID and Employee model
        /// </summary>
        /// <param name="empId"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("updateemployee/{empId}")]
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
        /// <summary>
        /// Get Employees By Department Id
        /// </summary>
        /// <param name="departmentId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getemployeesbydepartment/{departmentId}")]
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
        /// <summary>
        /// Get All employee
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getallemployee")]
        public IEnumerable<Employee> GetAllEmployee()
        {
            return _service.GetAllEmployee();
        }
    }
}