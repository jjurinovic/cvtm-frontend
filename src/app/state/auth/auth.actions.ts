import { createAction, props } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';

export enum AuthActionTypes {
  Login = '[Login Page] Login',
  LoginSuccess = '[Login Page] Login Success',
  LoginFail = '[Login Page] Login Fail',
}

export const login = createAction(
  AuthActionTypes.Login,
  props<{ payload: Auth }>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LoginSuccess,
  props<{ payload: any }>()
);

export const loginFailure = createAction(
  AuthActionTypes.LoginFail,
  props<{ payload: any }>()
);
