using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.DAL.Services;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.Models;
using Microsoft.VisualStudio.TestPlatform.Utilities;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Web_API_with_Angular.DAL.Services.Repository;
using Xunit;
using Xunit.Abstractions;

namespace EmployeeManagement.Tests.TestCases
{
    public class ExceptionalTests
    {
        private readonly ITestOutputHelper _output;
        private readonly IEmployeeService _EmployeeService;
        private readonly IDepartmentsServices _DepartmentsService;
        public readonly Mock<IEmployeesRepository> Employeeservice = new Mock<IEmployeesRepository>();
        public readonly Mock<IDepartmentsRepository> Departmentsservice = new Mock<IDepartmentsRepository>();

        private readonly Employee _Employee;
        private readonly Department _Department;

        private static string type = "Exception";
        public ExceptionalTests(ITestOutputHelper output)
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
        public async Task<bool> Testfor_Validate_ifInvalidEmployeeIdIsPassed()
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
                if (result != null || result.Id != 0)
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
        public async Task<bool> Testfor_Position_NotEmpty()
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
                var actualLength = _Employee.Position.ToString().Length;
                if (result.Position.ToString().Length == actualLength)
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
        public async Task<bool> Testfor_Validate_ifInvalidDepartmentIdIsPassed()
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
                if (result != null || result.Id != 0)
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
                var actualLength = _Employee.Position.ToString().Length;
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
