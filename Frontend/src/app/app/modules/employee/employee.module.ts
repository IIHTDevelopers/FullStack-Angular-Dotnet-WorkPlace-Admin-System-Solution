import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeService } from './services/employee.service';
import { DepartmentModule } from "../department/department.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    DepartmentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    EmployeeListComponent
  ],
  providers: [EmployeeService]
})

export class EmployeeModule { }
