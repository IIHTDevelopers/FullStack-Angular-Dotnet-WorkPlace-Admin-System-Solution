import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentSelectComponent } from './components/department-select/department-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from './services/department.service';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { RouterModule } from '@angular/router';
import { AddDepartmentComponent } from './components/add-department/add-department.component';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentSelectComponent,
    DepartmentDetailComponent,
    AddDepartmentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DepartmentListComponent,
    DepartmentSelectComponent
  ],
  providers: [DepartmentService]
})
export class DepartmentModule { }
