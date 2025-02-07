import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from '../../../core/services/http.service';
import { of, throwError } from 'rxjs';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let httpMock: HttpTestingController;
  let httpService: HttpService;

  const apiUrl = 'http://localhost:3000/employees'; // Base API URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // For mocking HttpClient
      providers: [EmployeeService, HttpService],
    });

    employeeService = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
  });

  afterEach(() => {
    httpMock.verify();  // Verifies that no unmatched requests are outstanding
  });

  describe('business', () => {
    it('should be created', () => {
      expect(employeeService).toBeTruthy();
    });

    it('should fetch all employees from the API', () => {
      const mockEmployees = [
        { id: 1, name: 'John Doe', department: 'HR' },
        { id: 2, name: 'Jane Smith', department: 'IT' },
      ];

      // Call the method
      employeeService.getEmployees().subscribe(employees => {
        expect(employees).toEqual(mockEmployees);
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees); // Return mock data
    });

    it('should fetch an employee by ID from the API', () => {
      const mockEmployee = { id: 1, name: 'John Doe', department: 'HR' };

      // Call the method with an ID
      employeeService.getEmployeeById(1).subscribe(employee => {
        expect(employee).toEqual(mockEmployee);
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployee); // Return mock data
    });

    it('should fetch employees by department ID', () => {
      const departmentId = 1;
      const mockEmployees = [
        { id: 1, name: 'John Doe', department: 'HR' },
        { id: 2, name: 'Jane Smith', department: 'HR' }
      ];

      // Call the method
      employeeService.getEmployeesByDepartment(departmentId).subscribe(employees => {
        expect(employees).toEqual(mockEmployees);
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(`http://localhost:3000/departmentEmployees?departmentId=${departmentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees); // Return mock data
    });
  });
});
