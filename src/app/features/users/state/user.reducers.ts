import { createReducer, on } from '@ngrx/store';

import * as UserActions from './users.actions';
import { User } from '../models/user.model';

export interface State {
  isLoading: boolean;
  user: User | null;
  users: User[];
  page: number;
  total: number | null;
  size: number;
  error: string | null;
  sort: string | null;
  sortField: string | null;
  q: string | null;
}

export const initialState: State = {
  isLoading: false,
  user: null,
  users: [],
  error: null,
  page: 1,
  total: null,
  size: 10,
  sort: null,
  sortField: null,
  q: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.createUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.createUserSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserActions.createUserFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.updateUserSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserActions.updateUserFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.getUserById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.getUserByIdSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    user: payload,
  })),
  on(UserActions.getUserByIdFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.getAllUsers, (state) => ({ ...state, isLoading: true })),
  on(UserActions.getAllUsersSuccess, (state, { payload }) => ({
    ...state,
    users: payload.results,
    size: payload.size,
    total: payload.total,
    page: payload.page,
    isLoading: false,
    sort: payload.sort,
    sortField: payload.sort_field,
    q: payload.q,
  })),
  on(UserActions.getAllUsersFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.resetUserForm, (state) => ({
    ...state,
    user: null,
  })),
  on(UserActions.passwordChange, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.passwordChangeSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserActions.passwordChangeFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.changeStatus, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.changeStatusSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    user: payload,
  })),
  on(UserActions.changeStatusFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.deleteUserSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    user: payload,
  })),
  on(UserActions.deleteUserFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.deleteUserHard, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.deleteUserHardSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(UserActions.deleteUserHardFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  })),
  on(UserActions.restore, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.restoreSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    user: payload,
  })),
  on(UserActions.restoreFail, (state, { payload }) => ({
    ...state,
    error: payload.detail,
    isLoading: false,
  }))
);
