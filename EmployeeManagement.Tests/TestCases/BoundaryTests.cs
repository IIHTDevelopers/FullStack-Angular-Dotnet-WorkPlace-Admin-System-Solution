using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.DAL.Services;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Web_API_with_Angular.DAL.Services.Repository;
using Xunit;
using Xunit.Abstractions;

namespace EmployeeManagement.Tests.TestCases
{
    public class BoundaryTests
    {
        private readonly ITestOutputHelper _output;
        private readonly IEmployeeService _EmployeeService;
        private readonly IDepartmentsServices _DepartmentsService;
        public readonly Mock<IEmployeesRepository> Employeeservice = new Mock<IEmployeesRepository>();
        public readonly Mock<IDepartmentsRepository> Departmentsservice = new Mock<IDepartmentsRepository>();

        private readonly Employee _Employee;
        private readonly Department _Department;

        private static string type = "Boundary";
        /// <summary>
        /// COnstructoer for data mocking
        /// </summary>
        /// <param name="output"></param>
        public BoundaryTests(ITestOutputHelper output)
        {
            _EmployeeService = new EmployeeService(Employeeservice.Object);
            _DepartmentsService = new DepartmentsService(Departmentsservice.Object);
            _output = output;

            _Employee = new Employee
            {
                Id = 1,
                Name = "Uma Kumar",
                Email = "umakumarsingh@gmail.com",
                Position = "Manager",
                Salary = 50000,
                DepartmentId = 1,
            };
            _Department = new Department
            {
                Id = 1,
                Name = "HR",
                Description = "HR Department Manage all resource."
            };
        }
        [Fact]
        public async Task<bool> Testfor_EmpID_NotEmpty()
        {
            //Arrange
            bool res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Employeeservice.Setup(repo => repo.CreateEmployee(_Employee)).ReturnsAsync(_Employee);
                var result = await _EmployeeService.CreateEmployee(_Employee);
                var actualLength = _Employee.Id.ToString().Length;
                if (result.Id.ToString().Length == actualLength)
                {
                    res = true;
                }
            }
            catch (Exception)
            {
                //Assert
                status = Convert.ToString(res);
                _output.WriteLine(testName + ":Failed");
                await CallAPI.saveTestResult(testName, status, type);
                return false;
            }
            status = Convert.ToString(res);
            if (res == true)
            {
                _output.WriteLine(testName + ":Passed");
            }
            else
            {
                _output.WriteLine(testName + ":Failed");
            }
            await CallAPI.saveTestResult(testName, status, type);
            return res;
        }
        [Fact]
        public async Task<bool> Testfor_DepartmentName_NotEmpty()
        {
            //Arrange
            bool res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Departmentsservice.Setup(repo => repo.CreateDepartment(_Department)).ReturnsAsync(_Department);
                var result = await _DepartmentsService.CreateDepartment(_Department);
                var actualLength = _Department.Name.ToString().Length;
                if (result.Name.ToString().Length == actualLength)
                {
                    res = true;
                }
            }
            catch (Exception)
            {
                //Assert
                status = Convert.ToString(res);
                _output.WriteLine(testName + ":Failed");
                await CallAPI.saveTestResult(testName, status, type);
                return false;
            }
            status = Convert.ToString(res);
            if (res == true)
            {
                _output.WriteLine(testName + ":Passed");
            }
            else
            {
                _output.WriteLine(testName + ":Failed");
            }
            await CallAPI.saveTestResult(testName, status, type);
            return res;
        }
    }
}
