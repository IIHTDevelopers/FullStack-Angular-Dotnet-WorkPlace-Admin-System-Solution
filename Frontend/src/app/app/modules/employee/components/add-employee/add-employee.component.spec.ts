import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmployeeComponent } from './add-employee.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the AddEmployeeComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Add New Employee');
    });

    it('should show the Add Employee button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const addButton = compiled.querySelector('button.btn-primary');
      expect(addButton).toBeTruthy();
      expect(addButton?.textContent).toContain('Add Employee');
    });

    it('should show the Cancel button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const cancelButton = compiled.querySelector('a.btn-secondary');
      expect(cancelButton).toBeTruthy();
      expect(cancelButton?.textContent).toContain('Cancel');
    });

    it('should display error message if errorMessage is set', () => {
      component.errorMessage = 'Failed to add employee. Please try again later.';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeTruthy();
      expect(errorMessageDiv?.textContent).toContain('Failed to add employee. Please try again later.');
    });

    it('should not display error message if errorMessage is not set', () => {
      component.errorMessage = '';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeFalsy(); // Error message should not be visible if it's empty
    });

    it('should display the correct initial values in the form fields', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nameInput = compiled.querySelector('input#name') as HTMLInputElement;
      const positionInput = compiled.querySelector('input#position') as HTMLInputElement;
      const salaryInput = compiled.querySelector('input#salary') as HTMLInputElement;
      const departmentSelect = compiled.querySelector('select#department') as HTMLSelectElement;

      expect(nameInput.value).toBe('');
      expect(positionInput.value).toBe('');
      expect(salaryInput.value).toBe('');
      expect(departmentSelect.value).toBe('');
    });

    it('should mark the name field as invalid if touched and empty', () => {
      const nameInput = component.employeeForm.controls['name'];
      nameInput.markAsTouched();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const invalidFeedback = compiled.querySelector('.invalid-feedback');
      expect(invalidFeedback?.textContent).toContain('Name is required.');
    });

    it('should mark the department field as invalid if touched and empty', () => {
      const departmentInput = component.employeeForm.controls['department'];
      departmentInput.markAsTouched();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const invalidFeedback = compiled.querySelector('.invalid-feedback');
      expect(invalidFeedback?.textContent).toContain('Department is required.');
    });

  });
});
