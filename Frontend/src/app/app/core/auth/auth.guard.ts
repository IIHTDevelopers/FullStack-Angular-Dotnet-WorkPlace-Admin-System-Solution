// src/app/core/auth/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // AuthService to check login status

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // This will check if the user is authenticated before allowing route activation
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If the user is authenticated, allow access to the route
    if (this.authService.currentUserValue) {
      return true;
    }

    // Otherwise, redirect the user to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
