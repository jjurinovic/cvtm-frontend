import { createReducer, on } from '@ngrx/store';

import * as TimeTrackingActions from './time-tracking.actions';
import { DayEntry } from '../models/day-entry.model';

export interface State {
  isLoading: boolean;
  day: DayEntry | null;
  error: string | null;
  days: DayEntry[];
}

export const initialState: State = {
  isLoading: false,
  day: null,
  error: null,
  days: [],
};

export const reducer = createReducer(
  initialState,
  on(TimeTrackingActions.getTimeEntries, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.getTimeEntriesSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    day: payload,
  })),
  on(TimeTrackingActions.getTimeEntriesFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),
  on(TimeTrackingActions.createTimeEntry, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.createTimeEntrySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(TimeTrackingActions.createTimeEntryFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),
  on(TimeTrackingActions.updateTimeEntry, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.updateTimeEntrySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(TimeTrackingActions.updateTimeEntryFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  }))
);
