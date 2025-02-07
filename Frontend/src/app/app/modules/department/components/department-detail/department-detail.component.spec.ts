import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentDetailComponent } from './department-detail.component';
import { DepartmentService } from '../../services/department.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('DepartmentDetailComponent', () => {
  let component: DepartmentDetailComponent;
  let fixture: ComponentFixture<DepartmentDetailComponent>;
  let departmentService: DepartmentService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentDetailComponent],
      imports: [RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        DepartmentService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }, // Mock route param for id
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentDetailComponent);
    component = fixture.componentInstance;
    departmentService = TestBed.inject(DepartmentService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the DepartmentDetailComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct header based on isEditMode', () => {
      // Check header when in view mode
      component.isEditMode = false;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('View Department');

      // Check header when in edit mode
      component.isEditMode = true;
      fixture.detectChanges();
      expect(compiled.querySelector('h2')?.textContent).toContain('Edit Department');
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
      component.errorMessage = 'Error fetching department details. Please try again later.';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeTruthy();
      expect(errorMessageDiv?.textContent).toContain('Error fetching department details. Please try again later.');
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
