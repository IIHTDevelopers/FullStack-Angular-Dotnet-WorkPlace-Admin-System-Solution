// src/app/modules/department/components/add-department/add-department.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Router for navigation
import { DepartmentService } from '../../services/department.service'; // Import DepartmentService
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup; // The form group to handle the department form
  errorMessage: string = ''; // Error message if the form submission fails

  constructor(
    private departmentService: DepartmentService, // Inject DepartmentService
    private router: Router, // Inject Router for navigation
    private fb: FormBuilder // Inject FormBuilder for reactive forms
  ) {
    // Initialize the form with validation
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Department name: required, min length of 3
      description: ['', [Validators.required, Validators.minLength(10)]], // Description: required, min length of 10
    });
  }

  ngOnInit(): void { }

  // Getter for easy access to form fields
  get f() {
    return this.departmentForm.controls;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.departmentForm.invalid) {
      return; // If the form is invalid, do not submit
    }

    const departmentData = this.departmentForm.value;

    this.departmentService.addDepartment(departmentData).subscribe(
      (response) => {
        // Redirect to department list after successful addition
        this.router.navigate(['/departments']);
      },
      (error) => {
        this.errorMessage = 'Failed to add department. Please try again later.';
        console.error('Error adding department:', error);
      }
    );
  }
}
