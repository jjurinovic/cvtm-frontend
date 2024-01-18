import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  loggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => state),
  on(LoginActions.loginSuccess, (state) => {
    return { ...state, loggedIn: true };
  }),
  on(LoginActions.loginFailure, (state) => {
    return { ...state, error: 'Login error' };
  }),
  on(LoginActions.logout, (state) => initialState)
);
