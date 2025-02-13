namespace EmployeeManagement_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SalaryTypechnage : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employees", "Salary", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Employees", "Salary", c => c.Int(nullable: false));
        }
    }
}
