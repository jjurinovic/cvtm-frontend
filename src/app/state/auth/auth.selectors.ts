import { createSelector } from '@ngrx/store';

const selectAuth = (state: any) => state.auth;

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state) => state.isLoggedIn
);

export const selectError = createSelector(selectAuth, (state) => state.error);

export const selectIsLoading = createSelector(
  selectAuth,
  (state) => state.isLoading
);

export const selectCurrentUser = createSelector(
  selectAuth,
  (state) => state.user
);
