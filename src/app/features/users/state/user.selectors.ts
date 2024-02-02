import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './user.reducers';

const selectUser = createFeatureSelector<State>('user');

export const selectAllUsers = createSelector(
  selectUser,
  (state) => state.users
);

export const selectTotalUsers = createSelector(
  selectUser,
  (state) => state.total
);

export const selectPageUsers = createSelector(
  selectUser,
  (state) => state.page
);

export const selectSizeUsers = createSelector(
  selectUser,
  (state) => state.size
);

export const selectSortUsers = createSelector(
  selectUser,
  (state) => state.sort
);

export const selectSortFieldUsers = createSelector(
  selectUser,
  (state) => state.sortField
);

export const selectSearchUsers = createSelector(selectUser, (state) => state.q);

export const selectUserData = createSelector(selectUser, (state) => state.user);

export const selectError = createSelector(selectUser, (state) => state.error);

export const selectIsLoading = createSelector(
  selectUser,
  (state) => state.isLoading
);
