namespace EmployeeManagement_API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EntityUpdateCheck : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.EmployeeLogins", "Password", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.EmployeeLogins", "Password", c => c.String());
        }
    }
}
