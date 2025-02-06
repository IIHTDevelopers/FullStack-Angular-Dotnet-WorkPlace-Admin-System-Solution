// src/app/modules/department/services/department.service.ts

import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service'; // HTTP service for making API calls
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // private apiUrl = 'http://localhost:3000/api/departments'; // Replace with your actual backend URL
  private apiUrl = 'http://localhost:3000/departments'; // Replace with your actual backend URL

  constructor(private httpService: HttpService) { }

  // Get all departments
  getDepartments(): Observable<any> {
    return this.httpService.get<any>(this.apiUrl);
  }

  // Get department details by ID
  getDepartmentById(id: number): Observable<any> {
    return this.httpService.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new department
  addDepartment(department: any): Observable<any> {
    return this.httpService.post<any>(this.apiUrl, department);
  }

  // Edit an existing department
  updateDepartment(id: number, department: any): Observable<any> {
    return this.httpService.put<any>(`${this.apiUrl}/${id}`, department);
  }

  // Delete a department by ID
  deleteDepartment(id: number): Observable<any> {
    return this.httpService.delete<any>(`${this.apiUrl}/${id}`);
  }
}
