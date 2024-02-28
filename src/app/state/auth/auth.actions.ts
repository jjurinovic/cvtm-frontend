import { createAction, props } from '@ngrx/store';

import { Auth } from 'src/app/core/models/auth.model';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { User } from 'src/app/features/users/models/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFail = '[Auth] Login Fail',
  Logout = '[Auth] Logout',
  SetCompanyId = '[Auth',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ payload: Auth }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ payload: AuthResponse }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFail,
  props<{ payload: BaseError }>()
);

export const logout = createAction(
  AuthActionTypes.Logout,
  props<{ payload?: boolean }>()
);
