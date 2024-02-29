import { createReducer, on } from '@ngrx/store';

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
  on(LoginActions.login, (state: State) => ({
    ...initialState,
    isLoading: true,
  })),
  on(LoginActions.loginSuccess, (state: State, { payload }) => ({
    ...state,
    isLoggedIn: true,
    isLoading: false,
  })),
  on(LoginActions.loginFailure, (state: State, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(LoginActions.logout, (state: State) => initialState)
);
