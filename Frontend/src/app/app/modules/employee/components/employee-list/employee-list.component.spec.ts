import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the EmployeeListComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct header text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Employees');
    });

    it('should show the Add Employee button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const addButton = compiled.querySelector('button.btn-primary');
      expect(addButton).toBeTruthy();
      expect(addButton?.textContent).toContain('Add Employee');
    });

    it('should show the department select component', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const departmentSelect = compiled.querySelector('app-department-select');
      expect(departmentSelect).toBeTruthy(); // Check if department select component is rendered
    });

    it('should show employee table when a department is selected', () => {
      component.departmentId = 1; // Simulate department selection
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('table');
      expect(table).toBeTruthy(); // The table should be displayed
    });

    it('should not show employee table when no department is selected', () => {
      component.departmentId = null; // Simulate no department selected
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('table');
      expect(table).toBeFalsy(); // The table should not be displayed
    });

    it('should display error message if errorMessage is set', () => {
      component.errorMessage = 'Failed to load employees. Please try again later.';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeTruthy();
      expect(errorMessageDiv?.textContent).toContain('Failed to load employees. Please try again later.');
    });

    it('should not display error message if errorMessage is not set', () => {
      component.errorMessage = '';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeFalsy(); // Error message should not be visible if it's empty
    });

    it('should navigate to the add employee page when "Add Employee" button is clicked', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      const addButton = fixture.nativeElement.querySelector('button.btn-primary');
      addButton.click();

      expect(navigateSpy).toHaveBeenCalledWith(['/employee/new']); // Navigate to add employee page
    });
  });
});
