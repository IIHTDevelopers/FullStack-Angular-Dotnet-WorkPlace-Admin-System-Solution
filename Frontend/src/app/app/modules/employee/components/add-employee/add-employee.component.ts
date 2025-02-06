// src/app/modules/employee/components/add-employee/add-employee.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service'; // Import EmployeeService
import { DepartmentService } from '../../../department/services/department.service'; // Import DepartmentService
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup; // The form group to handle the employee form
  errorMessage: string = ''; // Error message if the form submission fails
  departments: any[] = []; // Array to hold department data

  constructor(
    private employeeService: EmployeeService, // Inject EmployeeService
    private departmentService: DepartmentService, // Inject DepartmentService
    private router: Router, // Inject Router for navigation
    private fb: FormBuilder // Inject FormBuilder for reactive forms
  ) {
    // Initialize the form with validation
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Employee name: required, min length of 3
      position: ['', [Validators.required]], // Employee position: required
      department: ['', [Validators.required]], // Employee department: required
      salary: ['', [Validators.required, Validators.min(0)]], // Employee salary: required, positive number
    });
  }

  ngOnInit(): void {
    // Fetch the departments from the DepartmentService
    this.departmentService.getDepartments().subscribe(
      (response) => {
        this.departments = response; // Populate the departments array
      },
      (error) => {
        console.error('Error fetching departments:', error);
        this.errorMessage = 'Failed to load departments. Please try again later.';
      }
    );
  }

  // Getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
  }

  // Method to handle form submission
  onSubmit() {
    if (this.employeeForm.invalid) {
      return; // If the form is invalid, do not submit
    }

    const employeeData = this.employeeForm.value;

    // Make sure to include the department name in the request body
    const department = this.departments.find(d => d.id === employeeData.department);
    if (department) {
      employeeData.departmentName = department.name; // Add department name to the employee data
    }

    this.employeeService.addEmployee(employeeData).subscribe(
      (response) => {
        // Redirect to employee list after successful addition
        this.router.navigate(['/employees']);
      },
      (error) => {
        this.errorMessage = 'Failed to add employee. Please try again later.';
        console.error('Error adding employee:', error);
      }
    );
  }
}
