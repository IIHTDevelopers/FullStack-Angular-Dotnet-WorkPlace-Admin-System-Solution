// src/app/core/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Retrieve the token from AuthService
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      // Clone the request and add the Authorization header with the JWT token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    // Continue the request
    return next.handle(request);
  }
}
export { AuthService };

