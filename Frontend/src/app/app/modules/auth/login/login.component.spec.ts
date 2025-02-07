import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceMock = {
      login: jest.fn()  // Mocking the login method as a jest mock function
    };

    const routerMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, FormsModule],  // Import FormsModule for ngModel binding
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the login form', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Login');
      expect(compiled.querySelector('form')).toBeTruthy();
      expect(compiled.querySelector('input[type="text"]')).toBeTruthy();  // Username field
      expect(compiled.querySelector('input[type="password"]')).toBeTruthy();  // Password field
      expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();  // Login button
    });

    it('should call login method and redirect on success', () => {
      const mockResponse = { token: 'fake-token' };
      (authService.login as jest.Mock).mockReturnValue(of(mockResponse));  // Simulate successful login
      fixture.detectChanges();

      component.username = 'testuser';
      component.password = 'password';

      component.login();

      expect(authService.login).toHaveBeenCalledWith('testuser', 'password');
      expect(router.navigate).toHaveBeenCalledWith(['/home']);  // Check redirection
    });

    it('should show an error message on login failure', () => {
      const errorResponse = { error: 'Invalid credentials' };
      (authService.login as jest.Mock).mockReturnValue(throwError(() => errorResponse));  // Simulate login failure
      fixture.detectChanges();

      component.username = 'wronguser';
      component.password = 'wrongpassword';

      component.login();

      expect(authService.login).toHaveBeenCalledWith('wronguser', 'wrongpassword');
      expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
    });
  });
});
