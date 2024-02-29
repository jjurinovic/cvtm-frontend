import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthActionTypes, login, loginSuccess, logout } from './auth.actions';
import { Auth } from 'src/app/core/models/auth.model';
import { Role } from 'src/app/features/users/enums/role.enum';
import { UsersService } from 'src/app/features/users/services/users.service';
import { initialState } from './auth.reducers';
import { testAuthResponse, testError, testUser } from 'src/test-data/data';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let authServiceSpy: any;
  let userServiceSpy: any;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'setToken',
      'getRole',
      'setRole',
      'removeToken',
    ]);

    userServiceSpy = jasmine.createSpyObj('UsersService', ['getCurrentUser']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideMockActions(() => actions$),
        AuthEffects,
        {
          provide: UsersService,
          useValue: userServiceSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        provideMockStore({
          initialState,
        }),
      ],
    });
    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigateByUrl');
  });

  it('should call login and return response', (done) => {
    authServiceSpy.login.and.returnValue(of(testAuthResponse));

    const payload: Auth = { username: 'test', password: 'test' };

    actions$ = of(login({ payload }));
    effects.login$.subscribe((action) => {
      expect(action).toEqual({
        type: AuthActionTypes.LoginSuccess,
        payload: testAuthResponse,
      });
      done();
    });
  });

  it('should call login and return error', (done) => {
    authServiceSpy.login.and.throwError(testError);

    const payload: Auth = { username: 'test', password: 'test' };

    actions$ = of(login({ payload }));
    effects.login$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call loginSuccess$ and navigate to /admin', () => {
    actions$ = of(loginSuccess({ payload: testAuthResponse }));
    authServiceSpy.getRole.and.returnValue(Role.ROOT);

    // subscribe to execute the Effect
    effects.loginSuccess$.subscribe();

    expect(authServiceSpy.setToken).toHaveBeenCalled();
    expect(authServiceSpy.setRole).toHaveBeenCalled();
    expect(authServiceSpy.getRole).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('should call loginSuccess$ and navigate to /', () => {
    actions$ = of(loginSuccess({ payload: testAuthResponse }));
    authServiceSpy.getRole.and.returnValue(Role.USER);

    // subscribe to execute the Effect
    effects.loginSuccess$.subscribe();

    expect(authServiceSpy.setToken).toHaveBeenCalled();
    expect(authServiceSpy.setRole).toHaveBeenCalled();
    expect(authServiceSpy.getRole).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should call logout$ and navigate to /login', () => {
    actions$ = of(logout({}));

    // subscribe to execute the Effect
    effects.logout$.subscribe();

    expect(authServiceSpy.removeToken).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
