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
  });
});
