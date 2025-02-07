import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // For mocking HttpClient
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verifies that no unmatched requests are outstanding
  });

  describe('business', () => {
    it('should be created', () => {
      expect(authService).toBeTruthy();
    });

    it('should store user data and token in localStorage after login', () => {
      // Mocking the response from the API
      const mockResponse = { token: 'fake-token', username: 'testuser' };

      // Spy on localStorage.setItem
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      authService.login('testuser', 'password').subscribe(response => {
        expect(response.token).toBe('fake-token');
        expect(setItemSpy).toHaveBeenCalledWith('user', JSON.stringify(mockResponse));  // Ensure setItem is called with the correct arguments
      });

      // Mock the HTTP response
      const req = httpMock.expectOne('http://localhost:3000/auth');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);  // Return mock data
    });

    it('should return current user value correctly', () => {
      const mockUser = { username: 'testuser', token: 'fake-token' };

      // Setting a mock user in the BehaviorSubject
      authService['currentUserSubject'].next(mockUser);

      expect(authService.currentUserValue).toEqual(mockUser);  // Ensure the currentUserValue returns the correct value
    });
  });
});
