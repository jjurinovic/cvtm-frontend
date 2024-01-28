import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from '../features/users/services/users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { environment } from 'src/environments/environment';

const testToken = 'abc';
describe('AuthInterceptor', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  let url = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept request and add token if token exists', () => {
    localStorage.setItem('token', testToken);
    service.getCurrentUser().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}/user/me`,
    });
    expect(req.request.headers.has('Content-Type')).toEqual(true);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${testToken}`
    );
  });

  it('should intercept request and not add token if token does not exist', () => {
    localStorage.removeItem('token');
    service.getCurrentUser().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}/user/me`,
    });
    expect(req.request.headers.has('Content-Type')).toEqual(false);
    expect(req.request.headers.has('Authorization')).toEqual(false);
  });
});
