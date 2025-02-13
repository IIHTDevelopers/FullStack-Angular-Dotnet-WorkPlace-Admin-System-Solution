using EmployeeManagement_API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace EmployeeManagement_API.DAL
{
    public class DbInitializer : CreateDatabaseIfNotExists<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            // Seed Employee Login (Hardcoded Users)
            context.EmployeeLogins.Add(new EmployeeLogin
            {
                Id = 1,
                Email = "admin@techacdemy.com",
                Password = "Admin@123" // Store securely (hash it in production)
            });
            context.Employees.Add(new Employee
            {
                Id = 1,
                Name = "Uma Kumar",
                Email = "umakumarsingh@gmail.com",
                Position = "Manager",
                Salary = 50000,
                DepartmentId = 1,
            });
            context.Departments.Add(new Department
            {
                Id = 1,
                Name = "HR",
                Description = "HR Department Manage all resource."
            });

            context.SaveChanges();
        }
    }
}