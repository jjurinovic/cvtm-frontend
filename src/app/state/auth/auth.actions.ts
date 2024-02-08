import { createAction, props } from '@ngrx/store';

import { Auth } from 'src/app/core/models/auth.model';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { BaseError } from 'src/app/shared/models/error';
import { User } from 'src/app/features/users/models/user.model';

export enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginSuccess = '[Login Page] Login Success',
  LoginFail = '[Login Page] Login Fail',
  Logout = '[Base Component] Logout',
  CurrentUser = '[Users] Current user',
  CurrentUserSuccess = '[Users] Current user Success',
  CurrentUserFail = '[Users] Current user Fail',
  RemoveCurrentUser = '[Users] Remove current user',
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

export const currentUser = createAction(AuthActionTypes.CurrentUser);

export const currentUserSuccess = createAction(
  AuthActionTypes.CurrentUserSuccess,
  props<{ payload: User }>()
);

export const currentUserFail = createAction(
  AuthActionTypes.CurrentUserFail,
  props<{ payload: BaseError }>()
);

export const removeCurrentUser = createAction(
  AuthActionTypes.RemoveCurrentUser
);
