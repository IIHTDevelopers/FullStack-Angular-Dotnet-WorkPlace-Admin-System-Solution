import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';  // To test router links
import { AuthService } from '../app/app/core/auth/auth.service'; // Import AuthService
import { of } from 'rxjs';  // Mock observable response

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authService: AuthService;

    beforeEach(async () => {
        // Create a mock AuthService
        const authServiceMock = {
            currentUser: of(null), // Initial state as logged-out
            logout: jest.fn()
        };

        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule], // For routing
            providers: [
                { provide: AuthService, useValue: authServiceMock }  // Mock AuthService
            ]
        }).compileComponents();

        authService = TestBed.inject(AuthService); // Inject the mock AuthService
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();  // Detect changes to render the component
    });

    describe('boundary', () => {
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });

        it('should render the router links for Home, Departments, and Employees', () => {
            const compiled = fixture.nativeElement as HTMLElement;
            const homeLink = compiled.querySelector('a[routerLink="/home"]');
            const departmentsLink = compiled.querySelector('a[routerLink="/departments"]');
            const employeesLink = compiled.querySelector('a[routerLink="/employees"]');

            expect(homeLink).toBeTruthy();
            expect(departmentsLink).toBeTruthy();
            expect(employeesLink).toBeTruthy();
        });

        it('should display the Login link if the user is not logged in', () => {
            component.isLoggedIn = false;  // Simulate user logged out
            fixture.detectChanges();  // Trigger change detection

            const compiled = fixture.nativeElement as HTMLElement;
            const loginLink = compiled.querySelector('a[routerLink="/login"]');
            expect(loginLink).toBeTruthy();
        });

        it('should display the Logout link if the user is logged in', () => {
            component.isLoggedIn = true;  // Simulate user logged in
            fixture.detectChanges();  // Trigger change detection

            const compiled = fixture.nativeElement as HTMLElement;
            const logoutLink = compiled.querySelector('a.logout-link');
            expect(logoutLink).toBeTruthy();
        });

        it('should contain a router outlet', () => {
            const compiled = fixture.nativeElement as HTMLElement;
            const routerOutlet = compiled.querySelector('router-outlet');
            expect(routerOutlet).toBeTruthy();
        });

        it('should call logout and navigate to login page when logout link is clicked', () => {
            const authServiceMock = TestBed.inject(AuthService);
            const spy = jest.spyOn(authServiceMock, 'logout');

            // Simulate a logged-in user
            component.isLoggedIn = true;
            fixture.detectChanges();

            const compiled = fixture.nativeElement as HTMLElement;
            const logoutLink = compiled.querySelector('a.logout-link') as HTMLAnchorElement; // Explicitly cast to HTMLAnchorElement
            logoutLink?.click(); // Now you can call the click method

            expect(spy).toHaveBeenCalled();
            // You can check the navigation logic here if needed
        });
    });
});
