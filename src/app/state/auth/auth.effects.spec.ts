import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, catchError, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  AuthActionTypes,
  currentUser,
  currentUserSuccess,
  login,
  loginSuccess,
  logout,
} from './auth.actions';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { Auth } from 'src/app/core/models/auth.model';
import { BaseError } from 'src/app/shared/models/error';
import { Role } from 'src/app/features/users/enums/role.enum';
import { UsersService } from 'src/app/features/users/services/users.service';
import { initialState } from '../../features/users/state/user.reducers';
import { User } from 'src/app/features/users/models/user.model';
import { selectCurrentUser } from './auth.selectors';

const testUser: User = {
  first_name: 'test user',
  last_name: 'test user',
  company_id: 1,
  email: 'test@email.com',
  id: 999,
  role: 0,
};

const testAuthResponse: AuthResponse = {
  access_token: 'test',
  user: testUser,
};

const testError: BaseError = { detail: 'test error' };

const testInitalState = { ...initialState };

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
      imports: [HttpClientTestingModule],
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
          initialState: testInitalState,
          selectors: [{ selector: selectCurrentUser, value: null }],
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
    actions$ = of(logout());

    // subscribe to execute the Effect
    effects.logout$.subscribe();

    expect(authServiceSpy.removeToken).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should call currentUser$ and return response from endpoint', (done) => {
    userServiceSpy.getCurrentUser.and.returnValue(of(testUser));
    store.refreshState();

    actions$ = of(currentUser());
    effects.currentUser$.subscribe((action) => {
      expect(action).toEqual({
        type: AuthActionTypes.CurrentUserSuccess,
        payload: testUser,
      });
      done();
    });
  });

  it('should call currentUser$ and return error', (done) => {
    store.setState({});
    store.refreshState();
    userServiceSpy.getCurrentUser.and.throwError(testError);

    actions$ = of(currentUser());
    effects.currentUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call currentUserSuccess$ and set role', () => {
    actions$ = of(currentUserSuccess({ payload: testUser }));

    // subscribe to execute the Effect
    effects.currentUserSuccess$.subscribe();

    expect(authServiceSpy.setRole).toHaveBeenCalled();
  });
});
