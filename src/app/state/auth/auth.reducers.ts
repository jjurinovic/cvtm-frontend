import { Action, createReducer, on } from '@ngrx/store';
import * as LoginActions from './auth.actions';

export interface State {
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(LoginActions.login, (state) => ({ ...initialState, isLoading: true })),
  on(LoginActions.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
    isLoading: false,
  })),
  on(LoginActions.loginFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  })),
  on(LoginActions.logout, (state) => initialState)
);
