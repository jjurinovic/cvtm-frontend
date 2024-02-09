import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './user.reducers';

const selectUser = createFeatureSelector<State>('user');

export const selectAllUsers = createSelector(
  selectUser,
  (state) => state.users
);

export const selectUsersPageFilter = createSelector(
  selectUser,
  (state) => state.pageFilter
);

export const selectUserData = createSelector(selectUser, (state) => state.user);

export const selectError = createSelector(selectUser, (state) => state.error);

export const selectIsLoading = createSelector(
  selectUser,
  (state) => state.isLoading
);
