import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './app/core/core.module';
import { DepartmentModule } from './app/modules/department/department.module';
import { EmployeeModule } from './app/modules/employee/employee.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { HomePageComponent } from './app/modules/home/home.component';
import { EmployeeDetailsComponent } from './app/modules/employee/components/employee-details/employee-details.component';
import { AddDepartmentComponent } from './modules/department/components/add-department/add-department.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EmployeeDetailsComponent,
    AddDepartmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    CoreModule,
    DepartmentModule,
    EmployeeModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
