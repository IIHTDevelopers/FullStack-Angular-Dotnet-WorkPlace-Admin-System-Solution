import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './employee-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the EmployeeDetailsComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct header based on isEditMode', () => {
      // Check header when in view mode
      component.isEditMode = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('View Employee');

      // Check header when in edit mode
      component.isEditMode = true;
      fixture.detectChanges();
      expect(compiled.querySelector('h2')?.textContent).toContain('Edit Employee');
    });

    it('should show the Save and Cancel buttons in edit mode', () => {
      component.isEditMode = true;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const saveButton = compiled.querySelector('button.btn-primary');
      const cancelButton = compiled.querySelector('button.btn-secondary');
      expect(saveButton).toBeTruthy();
      expect(cancelButton).toBeTruthy();
    });

    it('should show the Edit and Back buttons in view mode', () => {
      component.isEditMode = false;
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const editButton = compiled.querySelector('a.btn-warning');
      const backButton = compiled.querySelector('a.btn-secondary');
      expect(editButton).toBeTruthy();
      expect(backButton).toBeTruthy();
    });

    it('should display error message if errorMessage is set', () => {
      component.errorMessage = 'Error fetching employee details. Please try again later.';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeTruthy();
      expect(errorMessageDiv?.textContent).toContain('Error fetching employee details. Please try again later.');
    });

    it('should not display error message if errorMessage is not set', () => {
      component.errorMessage = '';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeFalsy(); // Error message should not be visible if it's empty
    });
  });
});
