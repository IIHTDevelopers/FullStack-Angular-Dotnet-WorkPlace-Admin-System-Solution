import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceMock = {
      currentUserValue: { token: 'fake-token' }, // Mock user with a token
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock }, // Mock AuthService
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Provide the interceptor
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure there are no outstanding HTTP requests
  });

  describe('business', () => {
    it('should add Authorization header to the request if token is present', () => {
      // Perform a simple GET request
      httpClient.get('/test-url').subscribe(response => {
        expect(response).toBeTruthy();
      });

      // Verify the request and check if Authorization header is added
      const req = httpTestingController.expectOne('/test-url');
      expect(req.request.headers.has('Authorization')).toBeTruthy();
      expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');

      req.flush({}); // Mock response
    });

  });
});
