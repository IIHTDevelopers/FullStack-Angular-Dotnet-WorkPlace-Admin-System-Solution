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
    /// <summary>
    /// [AuthFilter] applied for validation before access this api must get token
    /// </summary>
    [AuthFilter]
    [RoutePrefix("api/departments")]
    public class DepartmentsController : ApiController
    {
        private readonly IDepartmentsServices _service;
        // GET: Departments
        public DepartmentsController()
        { }
        public DepartmentsController(IDepartmentsServices service)
        {
            _service = service;
        }
        /// <summary>
        /// Get all Deapartments
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllDepartments")]
        public IEnumerable<Department> GetAllDepartments()
        {
            return _service.GetAllDepartment();
        }
        /// <summary>
        /// Get Department By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id:long}")]
        public async Task<IHttpActionResult> GetDepartmentsId(long id)
        {
            var employee = await _service.GetDepartmentById(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }
        /// <summary>
        /// Create a new Departments by passing department model
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("departments")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> CreateDepartments([FromBody] Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var deptExists = await _service.GetDepartmentById(model.Id);
            if (deptExists != null)
            {
                return BadRequest("The specified Department ID already exist.");
            }
            var result = await _service.CreateDepartment(model);
            return Ok(new Response { Status = "Success", Message = "Employee created successfully!" });
        }
        /// <summary>
        /// Update Departments by Id and Departments Model
        /// </summary>
        /// <param name="deptId"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("UpdateDepartment/{deptId}")]
        public async Task<IHttpActionResult> UpdateDepartment(long deptId, [FromBody] Department model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (model == null)
            {
                return BadRequest("Invalid department data.");
            }
            // Step 4: Check if another department has the same name (except the current department being updated)
            var existingDept = await _service.GetDepartmentByName(model.Name);
            if (existingDept != null && existingDept.Id != deptId)
            {
                return BadRequest("Department with this name already exists.");
            }
            try
            {
                // Call the service to update the employee by EmployeeId
                var result = await _service.UpdateDepartment(deptId, model);

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
        /// Delete Departments by DepartmentID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("DeleteDepartment/{id}")]
        public async Task<IHttpActionResult> DeleteDepartment(long id)
        {
            var result = await _service.DeleteDepartmentById(id);
            return Ok(new Response { Status = "Success", Message = "Department deleted successfully!" });
        }
    }
}