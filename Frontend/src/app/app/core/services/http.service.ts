// src/app/core/services/http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Generic GET method
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // Generic POST method
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  // Generic PUT method
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  // Generic DELETE method
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
