import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const routerMock = { navigate: jest.fn() };  // Mock router to spy on navigation

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,        // To test routing
        HttpClientTestingModule     // To provide HttpClient in the test environment
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock },
        AuthService,  // Use the real AuthService (it will be spied on)
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('business', () => {
    it('should allow access if the user is authenticated', () => {
      // Spy on the getter and mock the currentUserValue to simulate an authenticated user
      jest.spyOn(authService, 'currentUserValue', 'get').mockReturnValue({ username: 'testuser' });

      // Call canActivate to test the guard behavior
      const result = authGuard.canActivate({} as any, {} as any);

      expect(result).toBe(true); // Should return true, granting access to the route
    });

    it('should redirect to login page if the user is not authenticated', () => {
      // Spy on the getter and mock the currentUserValue to simulate an unauthenticated user
      jest.spyOn(authService, 'currentUserValue', 'get').mockReturnValue(null);

      // Spy on the router's navigate method
      const navigateSpy = jest.spyOn(router, 'navigate');

      // Call canActivate to test the guard behavior
      const result = authGuard.canActivate({} as any, {} as any);

      expect(result).toBe(false); // Should return false, denying access
      expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Should navigate to the login page
    });
  });
});
