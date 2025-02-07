import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentSelectComponent } from './department-select.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('DepartmentSelectComponent', () => {
  let component: DepartmentSelectComponent;
  let fixture: ComponentFixture<DepartmentSelectComponent>;
  let departmentService: DepartmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentSelectComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [DepartmentService]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentSelectComponent);
    component = fixture.componentInstance;
    departmentService = TestBed.inject(DepartmentService);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the DepartmentSelectComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the label "Select Department"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const label = compiled.querySelector('label');
      expect(label?.textContent).toContain('Select Department');
    });

    it('should display a default option "Select a department"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const selectElement = compiled.querySelector('select#department');
      const defaultOption = selectElement?.querySelector('option');
      expect(defaultOption?.textContent).toContain('Select a department');
    });

    it('should display department options when departments are loaded', () => {
      // Simulate data for departments
      component.departments = [
        { id: 1, name: 'HR' },
        { id: 2, name: 'IT' }
      ];
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const options = compiled.querySelectorAll('select#department option');
      expect(options.length).toBe(3); // Default + 2 departments
      expect(options[1]?.textContent).toContain('HR');
      expect(options[2]?.textContent).toContain('IT');
    });
  });
});
