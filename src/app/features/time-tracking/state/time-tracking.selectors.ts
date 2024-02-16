import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './time-tracking.reducers';

const selectUser = createFeatureSelector<State>('timeTracking');

export const selectDay = createSelector(selectUser, (state) => state.day);
