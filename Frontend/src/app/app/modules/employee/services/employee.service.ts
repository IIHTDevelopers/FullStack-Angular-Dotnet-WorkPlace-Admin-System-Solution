// src/app/modules/employee/services/employee.service.ts

import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service'; // HTTP service for making API calls
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private apiUrl = 'http://localhost:3000/api/employees'; // Replace with your actual backend URL
  private apiUrl = 'http://localhost:3000/employees'; // Replace with your actual backend URL

  constructor(private httpService: HttpService) { }

  // Get all employees
  getEmployees(): Observable<any> {
    return this.httpService.get<any>(this.apiUrl);
  }

  // Get employee details by ID
  getEmployeeById(id: number): Observable<any> {
    return this.httpService.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new employee
  addEmployee(employee: any): Observable<any> {
    return this.httpService.post<any>(this.apiUrl, employee);
  }

  // Edit an existing employee
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.httpService.put<any>(`${this.apiUrl}/${id}`, employee);
  }

  // Delete an employee by ID
  deleteEmployee(id: number): Observable<any> {
    return this.httpService.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Get employees by department ID
  getEmployeesByDepartment(departmentId: number): Observable<any> {
    // return this.httpService.get<any>(`http://localhost:3000/api/employees/by-department/${departmentId}`);
    return this.httpService.get<any>(`http://localhost:3000/departmentEmployees?departmentId=${departmentId}`);
  }
}
