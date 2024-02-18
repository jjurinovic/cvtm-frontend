import { createReducer, on } from '@ngrx/store';

import { Day } from '../models/day.model';
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
  on(TimeTrackingActions.createDayEntry, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.createDayEntrySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(TimeTrackingActions.createDayEntryFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),
  on(TimeTrackingActions.updateDayEntry, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.updateDayEntrySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(TimeTrackingActions.updateDayEntryFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  }))
);
