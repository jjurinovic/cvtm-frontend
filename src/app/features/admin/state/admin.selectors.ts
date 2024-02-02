import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './admin.reducers';

const selectAdmin = createFeatureSelector<State>('admin');

export const selectAdminTabIndex = createSelector(
  selectAdmin,
  (state) => state.adminTabIndex
);
