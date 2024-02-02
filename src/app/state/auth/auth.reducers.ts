import { createReducer, on } from '@ngrx/store';

import * as LoginActions from './auth.actions';
import { User } from 'src/app/features/users/models/user.model';

export interface State {
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
  user: User | null;
}

export const initialState: State = {
  isLoggedIn: false,
  error: null,
  isLoading: false,
  user: null,
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
    user: payload.user,
  })),
  on(LoginActions.loginFailure, (state: State, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(LoginActions.currentUser, (state: State) => ({
    ...state,
    isLoading: true,
  })),
  on(LoginActions.currentUserSuccess, (state: State, { payload }) => ({
    ...state,
    isLoggedIn: true,
    isLoading: false,
    user: payload,
  })),
  on(LoginActions.currentUserFail, (state: State, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  })),
  on(LoginActions.logout, (state: State) => initialState)
);
