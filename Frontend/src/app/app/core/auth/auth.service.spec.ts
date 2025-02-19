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

    it('should return current user value correctly', () => {
      const mockUser = { username: 'testuser', token: 'fake-token' };

      // Setting a mock user in the BehaviorSubject
      authService['currentUserSubject'].next(mockUser);

      expect(authService.currentUserValue).toEqual(mockUser);  // Ensure the currentUserValue returns the correct value
    });
  });
});
