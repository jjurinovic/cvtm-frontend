import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { authGuard } from './auth.guard';
import { AuthService } from '../core/services/auth.service';

describe('AuthGuard', () => {
  let service: AuthService;
  let router: Router;
  const route: ActivatedRouteSnapshot = {} as any;
  const state: RouterStateSnapshot = {} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should return true', () => {
    service.setToken('abc');
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard(route, state);
    });

    expect(guardResponse).toBeTrue();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false and navigate to returnUrl', () => {
    service.removeToken();
    state.url = '/test';
    const guardResponse = TestBed.runInInjectionContext(() => {
      return authGuard(route, state);
    });

    expect(guardResponse).toBeFalse();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login?returnUrl=/test');
  });
});
