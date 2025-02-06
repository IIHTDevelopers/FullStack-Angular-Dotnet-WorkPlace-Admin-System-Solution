// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/modules/auth/login/login.component';
import { DepartmentListComponent } from './app/modules/department/components/department-list/department-list.component';
import { DepartmentSelectComponent } from './app/modules/department/components/department-select/department-select.component';
import { EmployeeListComponent } from './app/modules/employee/components/employee-list/employee-list.component';
import { HomePageComponent } from './app/modules/home/home.component';
import { AuthGuard } from './app/core/auth/auth.guard';
import { DepartmentDetailComponent } from './app/modules/department/components/department-detail/department-detail.component';
import { EmployeeDetailsComponent } from './app/modules/employee/components/employee-details/employee-details.component';

const routes: Routes = [
  // Default route - redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Route for login page (public, no guard)
  { path: 'login', component: LoginComponent },

  // Route for home page (after successful login) - Guarded route
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },

  // Route for department pages (Guarded route)
  { path: 'departments', component: DepartmentListComponent, canActivate: [AuthGuard] },

  // Route for employee pages (Guarded route)
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },

  // Route for viewing an employee
  { path: 'employee/details/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },

  // Route for editing an employee
  { path: 'employee/edit/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },

  // Route for department selection (could be used on employee pages for filtering)
  { path: 'department/select', component: DepartmentSelectComponent, canActivate: [AuthGuard] },

  // Route for viewing department details
  { path: 'department/details/:id', component: DepartmentDetailComponent, canActivate: [AuthGuard] },

  // Route for editing department details
  { path: 'department/edit/:id', component: DepartmentDetailComponent, canActivate: [AuthGuard] },

  // Route for adding a new department
  { path: 'department/details/new', component: DepartmentDetailComponent },

  // Fallback route (any route that doesn't match)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Set up routing in the app
  exports: [RouterModule] // Export RouterModule for use in the app
})
export class AppRoutingModule { }
