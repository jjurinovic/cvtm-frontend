import { createReducer, on } from '@ngrx/store';

import { Day } from '../models/day.model';
import * as TimeTrackingActions from './time-tracking.actions';

export interface State {
  isLoading: boolean;
  day: Day | null;
  error: string | null;
}

export const initialState: State = {
  isLoading: false,
  day: null,
  error: null,
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
  }))
);
