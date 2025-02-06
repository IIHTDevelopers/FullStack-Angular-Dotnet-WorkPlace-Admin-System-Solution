// src/app/modules/department/components/department-select.component.ts

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DepartmentService } from '../../services/department.service';  // Import department service

@Component({
  selector: 'app-department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.css']
})
export class DepartmentSelectComponent implements OnInit {
  @Output() departmentSelected: EventEmitter<number> = new EventEmitter(); // EventEmitter to emit selected department ID
  departments: any[] = [];  // Array to hold departments
  selectedDepartmentId: number | null = null;  // Hold the selected department ID

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.loadDepartments();  // Load departments when the component initializes
  }

  // Load departments from the service
  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (response) => {
        this.departments = response;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }

  // Emit the selected department ID when a department is selected
  onDepartmentSelect() {
    if (this.selectedDepartmentId !== null) {
      this.departmentSelected.emit(this.selectedDepartmentId);
    }
  }
}
