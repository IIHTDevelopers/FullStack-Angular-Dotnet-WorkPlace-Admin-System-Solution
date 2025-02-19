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
  });
});
