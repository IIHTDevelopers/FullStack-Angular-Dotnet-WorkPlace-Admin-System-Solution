// src/app/modules/auth/login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Login method to authenticate the user
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // console.log('Logged in successfully:', response);
        // Navigate to the home page after successful login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
