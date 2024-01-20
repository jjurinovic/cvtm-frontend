import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from '../features/users/services/users.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../core/auth/login/login.component';
import { Router } from '@angular/router';

describe('ErrorInterceptor', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  let url = 'http://localhost:8000';

  let routes = [{ path: 'login', component: LoginComponent }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);

    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept request and if there is error 401 logout and remove token', () => {
    localStorage.setItem('token', 'abc');
    const navigateSpy = spyOn(router, 'navigateByUrl');

    service.getCurrentUser().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();

        // check if token is removed
        const token = localStorage.getItem('token');
        expect(token).toBeFalsy();
        expect(navigateSpy).toHaveBeenCalledWith('/login');
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}/user/me`,
    });
    req.error(new ProgressEvent('error'), { status: 401 });
  });
});
