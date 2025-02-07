import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDepartmentComponent } from './add-department.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('AddDepartmentComponent', () => {
  let component: AddDepartmentComponent;
  let fixture: ComponentFixture<AddDepartmentComponent>;
  let departmentService: DepartmentService;
  let router: Router;

  beforeEach(async () => {
    // Mock the DepartmentService
    const departmentServiceMock = {
      addDepartment: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AddDepartmentComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: DepartmentService, useValue: departmentServiceMock },
      ]
    }).compileComponents();

    departmentService = TestBed.inject(DepartmentService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the AddDepartment component', () => {
      expect(component).toBeTruthy();
    });

    it('should render form fields for name and description', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nameField = compiled.querySelector('input#name');
      const descriptionField = compiled.querySelector('textarea#description');

      expect(nameField).toBeTruthy();
      expect(descriptionField).toBeTruthy();
    });

    it('should have a form with two required fields', () => {
      expect(component.departmentForm.controls['name'].valid).toBeFalsy();
      expect(component.departmentForm.controls['description'].valid).toBeFalsy();
    });

    it('should display validation error for name when empty', () => {
      const nameControl = component.departmentForm.controls['name'];
      nameControl.markAsTouched();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessage = compiled.querySelector('.invalid-feedback');

      expect(errorMessage?.textContent).toContain('Department name is required.');
    });

    it('should display validation error for description when empty', () => {
      const descriptionControl = component.departmentForm.controls['description'];
      descriptionControl.markAsTouched();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessage = compiled.querySelector('.invalid-feedback');

      expect(errorMessage?.textContent).toContain('Description is required.');
    });
  });
});
