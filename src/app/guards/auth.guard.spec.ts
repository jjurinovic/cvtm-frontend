import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { AuthService } from '../core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../core/auth/login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuard', () => {
  let service: AuthService;

  let routes = [{ path: 'login', component: LoginComponent }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should return true', () => {
    service.setToken('abc');
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard();
    });

    expect(guardResponse).toBeTrue();
  });

  it('should return false', () => {
    service.removeToken();
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard();
    });

    expect(guardResponse).toBeFalse();
  });
});
