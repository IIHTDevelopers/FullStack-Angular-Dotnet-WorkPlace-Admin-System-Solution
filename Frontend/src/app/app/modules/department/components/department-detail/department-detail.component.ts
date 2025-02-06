// src/app/modules/department/components/department-details/department-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute to get route params
import { DepartmentService } from '../../services/department.service'; // Import DepartmentService

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  departmentId!: number; // The department ID from the route
  department: any = {}; // The department data (either view or edit)
  isEditMode: boolean = false; // Flag to toggle between view and edit mode
  errorMessage: string = ''; // Error message if any

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to get route parameters
    private departmentService: DepartmentService, // Inject DepartmentService
    private router: Router // Router for navigation
  ) { }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id')!; // Get department ID from URL
    this.isEditMode = this.router.url.includes('edit'); // Check if we're in edit mode (based on the URL)

    // Fetch the department details from the server
    this.departmentService.getDepartmentById(this.departmentId).subscribe(
      (data) => {
        this.department = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching department details. Please try again later.';
        console.error('Error fetching department details:', error);
      }
    );
  }

  // Save updated department details (for edit mode)
  save() {
    if (this.isEditMode) {
      this.departmentService.updateDepartment(this.departmentId, this.department).subscribe(
        () => {
          this.router.navigate(['/departments']); // Navigate back to department list after saving
        },
        (error) => {
          this.errorMessage = 'Error saving department details. Please try again later.';
          console.error('Error saving department details:', error);
        }
      );
    }
  }

  // Cancel and go back to the department list
  cancel() {
    this.router.navigate(['/departments']);
  }
}
