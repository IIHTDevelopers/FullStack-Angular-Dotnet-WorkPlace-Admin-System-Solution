import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentSelectComponent } from './components/department-select/department-select.component';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from './services/department.service';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentSelectComponent,
    DepartmentDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    DepartmentListComponent,
    DepartmentSelectComponent
  ],
  providers: [DepartmentService]
})
export class DepartmentModule { }
