using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.DAL.Services;
using EmployeeManagement_API.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Web_API_with_Angular.DAL.Services.Repository;
using Xunit.Abstractions;
using System.Threading.Tasks;
using Xunit;

namespace EmployeeManagement.Tests.TestCases
{
    public class FunctionalTests
    {
        private readonly ITestOutputHelper _output;
        private readonly IEmployeeService _EmployeeService;
        private readonly IDepartmentsServices _DepartmentsService;
        public readonly Mock<IEmployeesRepository> Employeeservice = new Mock<IEmployeesRepository>();
        public readonly Mock<IDepartmentsRepository> Departmentsservice = new Mock<IDepartmentsRepository>();

        private readonly Employee _Employee;
        private readonly Department _Department;

        private static string type = "Functional";
        public FunctionalTests(ITestOutputHelper output)
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
        public async Task<bool> Testfor_Create_Employee()
        {
            //Arrange
            var res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Employeeservice.Setup(repos => repos.CreateEmployee(_Employee)).ReturnsAsync(_Employee);
                var result = await _EmployeeService.CreateEmployee(_Employee);
                //Assertion
                if (result != null)
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
        public async Task<bool> Testfor_Update_Employee()
        {
            //Arrange
            bool res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Employeeservice.Setup(repos => repos.UpdateEmployee(_Employee)).ReturnsAsync(_Employee);
                var result = await _EmployeeService.UpdateEmployee(_Employee);
                if (result != null)
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
        public async Task<bool> Testfor_GetEmployeeById()
        {
            //Arrange
            var res = false;
            int id = 1;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Employeeservice.Setup(repos => repos.GetEmployeeById(id)).ReturnsAsync(_Employee);
                var result = await _EmployeeService.GetEmployeeById(id);
                //Assertion
                if (result != null)
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
        public async Task<bool> Testfor_DeleteEmployeeById()
        {
            //Arrange
            var res = false;
            int id = 1;
            bool response = true;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Employeeservice.Setup(repos => repos.DeleteEmployeeById(id)).ReturnsAsync(response);
                var result = await _EmployeeService.DeleteEmployeeById(id);
                //Assertion
                if (result == true)
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
        public async Task<bool> Testfor_Create_Department()
        {
            //Arrange
            var res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Departmentsservice.Setup(repos => repos.CreateDepartment(_Department)).ReturnsAsync(_Department);
                var result = await _DepartmentsService.CreateDepartment(_Department);
                //Assertion
                if (result != null)
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
        public async Task<bool> Testfor_Update_Department()
        {
            //Arrange
            bool res = false;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Departmentsservice.Setup(repos => repos.UpdateDepartment(_Department)).ReturnsAsync(_Department);
                var result = await _DepartmentsService.UpdateDepartment(_Department);
                if (result != null)
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
        public async Task<bool> Testfor_GetDepartmentById()
        {
            //Arrange
            var res = false;
            int id = 1;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Departmentsservice.Setup(repos => repos.GetDepartmentById(id)).ReturnsAsync(_Department);
                var result = await _DepartmentsService.GetDepartmentById(id);
                //Assertion
                if (result != null)
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
        public async Task<bool> Testfor_DeleteDepartmentById()
        {
            //Arrange
            var res = false;
            int id = 1;
            bool response = true;
            string testName; string status;
            testName = CallAPI.GetCurrentMethodName();

            //Action
            try
            {
                Departmentsservice.Setup(repos => repos.DeleteDepartmentById(id)).ReturnsAsync(response);
                var result = await _DepartmentsService.DeleteDepartmentById(id);
                //Assertion
                if (result == true)
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
