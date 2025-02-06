// src/app/modules/employee/components/employee-list.component.ts

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service'; // Import employee service
import { Router } from '@angular/router'; // Router for navigation

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];  // Array to hold employee data
  errorMessage: string = ''; // To display errors
  departmentId: number | null = null; // To store selected department ID for filtering

  constructor(
    private employeeService: EmployeeService,  // Inject EmployeeService
    private router: Router  // Inject Router for navigation
  ) { }

  ngOnInit() {
    // We do not load employees here anymore, employees will be loaded when a department is selected.
  }

  // Load employees from the service (filtered by department if selected)
  loadEmployees() {
    if (this.departmentId) {
      this.employeeService.getEmployeesByDepartment(this.departmentId).subscribe({
        next: (response) => {
          this.employees = response;
        },
        error: (error) => {
          console.error('Error fetching employees:', error);
          this.errorMessage = 'Failed to load employees. Please try again later.';
        }
      });
    }
  }

  // Edit an employee
  editEmployee(id: number) {
    this.router.navigate([`/employee/edit`, id]); // Navigate to the edit page
  }

  // Delete an employee
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();  // Reload the employees after deletion
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.errorMessage = 'Failed to delete employee. Please try again later.';
        }
      });
    }
  }

  // View employee details
  viewEmployee(id: number) {
    this.router.navigate([`/employee/details`, id]); // Navigate to employee details page
  }

  // Filter employees by department
  onDepartmentSelected(departmentId: number) {
    this.departmentId = departmentId;
    this.loadEmployees(); // Reload employees based on selected department
  }
}
