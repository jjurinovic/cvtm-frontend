import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../core/services/auth.service';

const testToken = 'Bearer abc';

describe('AuthInterceptor', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept request and add token if token exists', (done) => {
    authServiceSpy.getToken.and.returnValue(testToken);
    httpClient.get('/test').subscribe(() => done());

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `/test`,
    });
    req.flush({});

    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${testToken}`
    );
  });

  it('should intercept request and not add token if token does not exist', (done) => {
    authServiceSpy.getToken.and.returnValue(null);
    httpClient.get('/test').subscribe(() => done());

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `/test`,
    });
    req.flush({});

    expect(req.request.headers.has('Authorization')).toEqual(false);
    expect(req.request.headers.get('Authorization')).toBeFalsy();
  });
});
