// src/app/modules/employee/components/employee-details/employee-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute to get route params
import { EmployeeService } from '../../services/employee.service'; // Import EmployeeService

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId!: number; // The employee ID from the route
  employee: any = {}; // The employee data (either view or edit)
  isEditMode: boolean = false; // Flag to toggle between view and edit mode
  errorMessage: string = ''; // Error message if any

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to get route parameters
    private employeeService: EmployeeService, // Inject EmployeeService
    private router: Router // Router for navigation
  ) { }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!; // Get employee ID from URL
    this.isEditMode = this.router.url.includes('edit'); // Check if we're in edit mode (based on the URL)

    // Fetch the employee details from the server
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching employee details. Please try again later.';
        console.error('Error fetching employee details:', error);
      }
    );
  }

  // Save updated employee details (for edit mode)
  save() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe(
        () => {
          this.router.navigate(['/employees']); // Navigate back to employee list after saving
        },
        (error) => {
          this.errorMessage = 'Error saving employee details. Please try again later.';
          console.error('Error saving employee details:', error);
        }
      );
    }
  }

  // Cancel and go back to the employee list
  cancel() {
    this.router.navigate(['/employees']);
  }
}
