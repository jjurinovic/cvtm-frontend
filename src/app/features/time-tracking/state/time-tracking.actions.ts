import { createAction, props } from '@ngrx/store';

import { DayRequest } from '../models/day-request.model';
import { Day } from '../models/day.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { DayEntry } from '../models/day-entry.model';

export enum TimeTrackingActionTypes {
  CreateDay = '[Time Tracking] Create Day',
  CreateDaySuccess = '[Time Tracking] Create Day Success',
  CreateDayFail = '[Time Tracking] Create Day Fail',
  GetDay = '[Time Tracking] Get Day by id',
  GetDaySuccess = '[Time Tracking] Get Day by id Success',
  GetDayFail = '[Time Tracking] Get Day by id Fail',
  GetDays = '[Time Tracking] Get Days',
  GetDaysSuccess = '[Time Tracking] Get Days Success',
  GetDaysFail = '[Time Tracking] Get Days Fail',
  GetDayEntry = '[Time Tracking] Get Day Entry by id',
  GetDayEntrySuccess = '[Time Tracking] Get Day Entry by id Success',
  GetDayEntryFail = '[Time Tracking] Get Day Entry by id Fail',
}

/** CREATE DAY */
export const createDay = createAction(
  TimeTrackingActionTypes.CreateDay,
  props<{ payload: DayRequest }>()
);

export const createDaySuccess = createAction(
  TimeTrackingActionTypes.CreateDaySuccess,
  props<{ payload: Day }>()
);

export const createDayFail = createAction(
  TimeTrackingActionTypes.CreateDayFail,
  props<{ payload: BaseError }>()
);

/** GET DAY BY ID */
export const getDay = createAction(
  TimeTrackingActionTypes.GetDay,
  props<{ payload: number }>()
);

export const getDaySuccess = createAction(
  TimeTrackingActionTypes.GetDaySuccess,
  props<{ payload: Day }>()
);

export const getDayFail = createAction(
  TimeTrackingActionTypes.GetDayFail,
  props<{ payload: BaseError }>()
);

/** GET DAYS */
export const getDays = createAction(
  TimeTrackingActionTypes.GetDays,
  props<{ payload: DayRequest }>()
);

export const getDaysSuccess = createAction(
  TimeTrackingActionTypes.GetDaysSuccess,
  props<{ payload: Day[] }>()
);

export const getDaysFail = createAction(
  TimeTrackingActionTypes.GetDaysFail,
  props<{ payload: BaseError }>()
);

/** CREATE DAY ENTRY */
export const getDayEntry = createAction(
  TimeTrackingActionTypes.GetDayEntry,
  props<{ payload: DayEntry }>()
);

export const getDayEntrySuccess = createAction(
  TimeTrackingActionTypes.GetDayEntrySuccess,
  props<{ payload: DayEntry }>()
);

export const getDayEntryFail = createAction(
  TimeTrackingActionTypes.GetDayEntryFail,
  props<{ payload: BaseError }>()
);
