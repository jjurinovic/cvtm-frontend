import { createReducer, on } from '@ngrx/store';

import * as UserActions from './users.actions';
import { User } from '../models/user.model';
import { PageFilter } from 'src/app/shared/models/page-filter.mode';

export interface State {
  isLoading: boolean;
  user: User | null;
  users: User[];
  error: string | null;
  pageFilter: PageFilter;
}

export const initialState: State = {
  isLoading: false,
  user: null,
  users: [],
  error: null,
  pageFilter: {
    page: 1,
    size: 10,
    total: 0,
    q: null,
    sort: null,
    sort_field: null,
  },
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
    pageFilter: payload.page_filter,
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
    user: null,
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
