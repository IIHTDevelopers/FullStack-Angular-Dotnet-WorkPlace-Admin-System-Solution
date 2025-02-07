import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentListComponent } from './department-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DepartmentListComponent', () => {
  let component: DepartmentListComponent;
  let fixture: ComponentFixture<DepartmentListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentListComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the DepartmentListComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should display the correct header text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Departments');
    });

    it('should show the Add Department button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const addButton = compiled.querySelector('button.btn-success');
      expect(addButton).toBeTruthy();
      expect(addButton?.textContent).toContain('Add Department');
    });

    it('should show the table with columns "ID", "Name", "Description", and "Actions"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const table = compiled.querySelector('table');
      const headers = table?.querySelectorAll('th');
      expect(headers?.length).toBe(4); // ID, Name, Description, Actions
      expect(headers?.[0].textContent).toContain('ID');
      expect(headers?.[1].textContent).toContain('Name');
      expect(headers?.[2].textContent).toContain('Description');
      expect(headers?.[3].textContent).toContain('Actions');
    });

    it('should display department rows in the table', () => {
      // Simulate some data for departments
      component.departments = [
        { id: 1, name: 'HR', description: 'Human Resources' },
        { id: 2, name: 'IT', description: 'Information Technology' }
      ];
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const rows = compiled.querySelectorAll('table tbody tr');
      expect(rows.length).toBe(2); // Should have 2 rows based on the simulated data
      expect(rows[0].textContent).toContain('HR');
      expect(rows[1].textContent).toContain('IT');
    });

    it('should show error message if errorMessage is set', () => {
      component.errorMessage = 'Failed to load departments. Please try again later.';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeTruthy();
      expect(errorMessageDiv?.textContent).toContain('Failed to load departments. Please try again later.');
    });

    it('should not display error message if errorMessage is not set', () => {
      component.errorMessage = '';
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const errorMessageDiv = compiled.querySelector('.error-message');
      expect(errorMessageDiv).toBeFalsy(); // Error message should not be visible if it's empty
    });

    it('should navigate to the department details page when "View" button is clicked', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      const mockDepartments = [
        { id: 1, name: 'HR', description: 'Human Resources' }
      ];
      component.departments = mockDepartments;
      fixture.detectChanges();

      const viewButton = fixture.nativeElement.querySelector('button.btn-info');
      viewButton.click();

      expect(navigateSpy).toHaveBeenCalledWith(['/department/details', 1]); // Navigate to department details page
    });

    it('should navigate to the department edit page when "Edit" button is clicked', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');

      const mockDepartments = [
        { id: 1, name: 'HR', description: 'Human Resources' }
      ];
      component.departments = mockDepartments;
      fixture.detectChanges();

      const editButton = fixture.nativeElement.querySelector('button.btn-warning');
      editButton.click();

      expect(navigateSpy).toHaveBeenCalledWith(['/department/edit', 1]); // Navigate to department edit page
    });

    it('should call deleteDepartment when "Delete" button is clicked', () => {
      const mockDepartments = [
        { id: 1, name: 'HR', description: 'Human Resources' }
      ];
      component.departments = mockDepartments;
      fixture.detectChanges();

      const deleteButton = fixture.nativeElement.querySelector('button.btn-danger');
      const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);  // Mocking the confirm dialog
      deleteButton.click();

      expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this department?');
    });
  });
});
