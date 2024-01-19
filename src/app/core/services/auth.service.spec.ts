import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/features/users/models/user.model';
import { Role } from 'src/app/features/users/enums/role.enum';

const testToken = 'abc';
const testUser: User = {
  id: 2,
  name: 'test name',
  email: 'abc@test.com',
  role: Role.ADMIN,
  company_id: 1,
};

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  let url = 'http://localhost:8000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getToken() return "abc"', () => {
    localStorage.setItem('token', testToken);
    expect(service.getToken()).toEqual(testToken);
  });

  it('should removeToken() delete token', () => {
    service.removeToken();
    expect(service.getToken()).toBeFalsy();
  });

  it('should isLoggedIn() return true', () => {
    localStorage.setItem('token', testToken);
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should isLoggedIn() return false', () => {
    service.removeToken();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should call login()', () => {
    service.removeToken();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should call login() and return when logged in', () => {
    service.login('test', 'pass').subscribe((res) => {
      expect(res).toEqual(testUser);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${url}/login`,
    });

    req.flush(testUser);
  });
});
