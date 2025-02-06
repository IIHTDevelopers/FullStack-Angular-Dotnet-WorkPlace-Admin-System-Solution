// src/app/core/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:3000/api/auth'; // Replace with your actual backend URL
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your actual backend URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Login method: To authenticate the user and store the token
  login(username: string, password: string): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      tap(response => {
        // Store the token in local storage
        // console.log(response);
        
        if (response.token) {
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      })
    );
  }

  // Get the current logged-in user
  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Logout method: Removes the token from local storage
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}


// src/app/core/auth/auth.service.ts

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;

//   constructor() {
//     // Get the current user from local storage, or set to null if not logged in
//     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')!));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   login(username: string): Observable<any> {
//     // Mock user login logic (replace with actual login logic)
//     const mockUser = { username, token: 'jwt_token_here' };
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     this.currentUserSubject.next(mockUser);
//     return new Observable((observer) => {
//       observer.next(mockUser);
//       observer.complete();
//     });
//   }

//   logout() {
//     // Remove the user from local storage and reset the current user subject
//     localStorage.removeItem('user');
//     this.currentUserSubject.next(null);
//   }

//   get currentUserValue() {
//     return this.currentUserSubject.value;
//   }
// }
