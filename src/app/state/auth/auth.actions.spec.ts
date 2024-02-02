import { Auth } from 'src/app/core/models/auth.model';
import * as AuthActions from './auth.actions';
import { AuthActionTypes } from './auth.actions';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { BaseError } from 'src/app/shared/models/error';
import { User } from 'src/app/features/users/models/user.model';

describe('Login', () => {
  it('should create an action', () => {
    const payload: Auth = {
      username: 'test_username',
      password: 'test_password',
    };
    const action = AuthActions.login({ payload });

    expect({ ...action }).toEqual({ type: AuthActionTypes.Login, payload });
  });
});

describe('Login Success', () => {
  it('should create an action', () => {
    const payload: AuthResponse = {
      access_token: 'token',
      user: {
        name: 'test user',
        company_id: 1,
        email: 'test@email.com',
        id: 999,
        role: 0,
      },
    };
    const action = AuthActions.loginSuccess({ payload });

    expect({ ...action }).toEqual({
      type: AuthActionTypes.LoginSuccess,
      payload,
    });
  });
});

describe('Login Fail', () => {
  it('should create an action', () => {
    const payload: BaseError = { detail: 'This is error' };
    const action = AuthActions.loginFailure({ payload });

    expect({ ...action }).toEqual({
      type: AuthActionTypes.LoginFail,
      payload,
    });
  });
});

describe('Logout', () => {
  it('should create an action', () => {
    const action = AuthActions.logout();

    expect({ ...action }).toEqual({
      type: AuthActionTypes.Logout,
    });
  });
});

describe('Current User', () => {
  it('should create an action', () => {
    const action = AuthActions.currentUser();

    expect({ ...action }).toEqual({
      type: AuthActionTypes.CurrentUser,
    });
  });
});

describe('Current User Success', () => {
  it('should create an action', () => {
    const payload: User = {
      name: 'test user',
      company_id: 1,
      email: 'test@email.com',
      id: 999,
      role: 0,
    };
    const action = AuthActions.currentUserSuccess({ payload });

    expect({ ...action }).toEqual({
      type: AuthActionTypes.CurrentUserSuccess,
      payload,
    });
  });
});

describe('Current User Fail', () => {
  it('should create an action', () => {
    const payload: BaseError = { detail: 'This is error' };
    const action = AuthActions.currentUserFail({ payload });

    expect({ ...action }).toEqual({
      type: AuthActionTypes.CurrentUserFail,
      payload,
    });
  });
});
