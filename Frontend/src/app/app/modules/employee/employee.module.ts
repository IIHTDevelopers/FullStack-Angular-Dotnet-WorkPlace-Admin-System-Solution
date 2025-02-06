import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeService } from './services/employee.service';
import { DepartmentModule } from "../department/department.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    CommonModule,
    DepartmentModule,
    FormsModule
  ],
  exports: [
    EmployeeListComponent
  ],
  providers: [EmployeeService]
})

export class EmployeeModule { }
