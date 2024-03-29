import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './time-tracking.reducers';

const selectTImeTracking = createFeatureSelector<State>('timeTracking');

export const selectDay = createSelector(
  selectTImeTracking,
  (state) => state.day
);
export const selectDays = createSelector(
  selectTImeTracking,
  (state) => state.days
);

export const selectDate = createSelector(
  selectTImeTracking,
  (state) => state.date
);

export const selectDayLoading = createSelector(
  selectTImeTracking,
  (state) => state.isLoading
);
