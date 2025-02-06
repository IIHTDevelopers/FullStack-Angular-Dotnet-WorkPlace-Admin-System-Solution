// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from './app/core/auth/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WorkPlace Admin Platform';  // Title of the app
  isLoggedIn: boolean = false;  // Track if the user is logged in

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Subscribe to the currentUser observable to update login status dynamically
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;  // Set isLoggedIn to true if user is logged in
    });
  }

  // Logout method
  logout() {
    this.authService.logout();  // Call the logout method from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
