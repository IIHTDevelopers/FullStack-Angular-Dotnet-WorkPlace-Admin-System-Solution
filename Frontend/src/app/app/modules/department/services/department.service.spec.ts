import { TestBed } from '@angular/core/testing';
import { DepartmentService } from './department.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from '../../../core/services/http.service';
import { of } from 'rxjs';

describe('DepartmentService', () => {
  let departmentService: DepartmentService;
  let httpMock: HttpTestingController;
  let httpService: HttpService;

  const apiUrl = 'http://localhost:3000/departments'; // Base API URL

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // For mocking HttpClient
      providers: [DepartmentService, HttpService],
    });

    departmentService = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HttpService);
  });

  afterEach(() => {
    httpMock.verify();  // Verifies that no unmatched requests are outstanding
  });

  describe('business', () => {
    it('should be created', () => {
      expect(departmentService).toBeTruthy();
    });

    it('should fetch all departments from the API', () => {
      const mockDepartments = [
        { id: 1, name: 'HR', description: 'Human Resources' },
        { id: 2, name: 'IT', description: 'Information Technology' },
      ];

      // Call the method
      departmentService.getDepartments().subscribe(departments => {
        expect(departments).toEqual(mockDepartments);
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockDepartments); // Return mock data
    });

    it('should fetch a department by ID from the API', () => {
      const mockDepartment = { id: 1, name: 'HR', description: 'Human Resources' };

      // Call the method with an ID
      departmentService.getDepartmentById(1).subscribe(department => {
        expect(department).toEqual(mockDepartment);
      });

      // Mock the HTTP request
      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockDepartment); // Return mock data
    });
  });
});
