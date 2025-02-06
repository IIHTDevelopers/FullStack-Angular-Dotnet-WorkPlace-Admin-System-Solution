// src/app/modules/department/components/department-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service'; // Import department service
import { Router } from '@angular/router'; // Router for navigation

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: any[] = [];  // Array to hold departments
  errorMessage: string = ''; // To display errors

  constructor(
    private departmentService: DepartmentService,  // Inject DepartmentService
    private router: Router  // Inject Router for navigation
  ) { }

  ngOnInit() {
    this.loadDepartments();  // Load departments on component initialization
  }

  // Load departments from the service
  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
        this.errorMessage = 'Failed to load departments. Please try again later.';
      }
    });
  }

  // Edit a department
  editDepartment(id: number) {
    this.router.navigate([`/department/edit`, id]); // Navigate to the edit page
  }

  // Delete a department
  deleteDepartment(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          this.loadDepartments();  // Reload the departments after deletion
        },
        error: (error) => {
          console.error('Error deleting department:', error);
          this.errorMessage = 'Failed to delete department. Please try again later.';
        }
      });
    }
  }

  // View department details
  viewDepartment(id: number) {
    this.router.navigate([`/department/details`, id]); // Navigate to department details page
  }

  // Add a new department
  addDepartment() {
    this.router.navigate(['/department/details', 'new']); // Navigate to the department details component with a 'new' identifier
  }
}
