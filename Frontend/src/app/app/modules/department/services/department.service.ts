import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // private apiUrl = 'http://localhost:3000/api/departments';
  private apiUrl = 'https://localhost:44318/api/departments';

  constructor(private httpService: HttpService) { }

  // Get all departments
  getDepartments(): Observable<any> {
    return this.httpService.get<any>(`${this.apiUrl}/getalldepartments`);
  }

  // Get department details by ID
  getDepartmentById(id: number): Observable<any> {
    return this.httpService.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new department
  addDepartment(department: any): Observable<any> {
    return this.httpService.post<any>(`${this.apiUrl}/createdepartments`, department);
  }

  // Edit an existing department
  updateDepartment(id: number, department: any): Observable<any> {
    return this.httpService.put<any>(`${this.apiUrl}/updatedepartment/${id}`, department);
  }

  // Delete a department by ID
  deleteDepartment(id: number): Observable<any> {
    return this.httpService.delete<any>(`${this.apiUrl}/deletedepartment/${id}`);
  }
}
