import { createReducer, on } from '@ngrx/store';

import { Day } from '../models/day.model';
import * as TimeTrackingActions from './time-tracking.actions';

export interface State {
  isLoading: boolean;
  day: Day | null;
  error: string | null;
  days: Day[];
}

export const initialState: State = {
  isLoading: false,
  day: null,
  error: null,
  days: [],
};

export const reducer = createReducer(
  initialState,
  on(TimeTrackingActions.getDay, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.getDaySuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    day: payload,
  })),
  on(TimeTrackingActions.getDayFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),
  on(TimeTrackingActions.createDay, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.createDaySuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    day: payload,
  })),
  on(TimeTrackingActions.createDayFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),
  on(TimeTrackingActions.getDays, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TimeTrackingActions.getDaysSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    days: payload,
  })),
  on(TimeTrackingActions.getDaysFail, (state, { payload }) => ({
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
