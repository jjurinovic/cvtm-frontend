import { createAction, props } from '@ngrx/store';

import { BaseError } from 'src/app/shared/models/error.model';
import { DayEntry } from '../models/day-entry.model';
import { TimeEntriesRequest } from '../models/time-entries-request.model';
import { ITimeEntry, TimeEntry } from '../models/time-entry.model';

export enum TimeTrackingActionTypes {
  GetTimeEntries = '[Time Tracking] Get Time Entries',
  GetTimeEntriesSuccess = '[Time Tracking] Get Time Entries Success',
  GetTimeEntriesFail = '[Time Tracking] Get Time Entries Fail',
  CreateDayEntry = '[Time Tracking] Create Day Entry',
  CreateDayEntrySuccess = '[Time Tracking] Create Day Entry Success',
  CreateDayEntryFail = '[Time Tracking] Create Day Entry Fail',
  UpdateDayEntry = '[Time Tracking] Update Day Entry by id',
  UpdateDayEntrySuccess = '[Time Tracking] Update Day Entry Success',
  UpdateDayEntryFail = '[Time Tracking] Update Day Entry Fail',
}

/** GET DAY BY ID */
export const getTimeEntries = createAction(
  TimeTrackingActionTypes.GetTimeEntries,
  props<{ payload: TimeEntriesRequest }>()
);

export const getTimeEntriesSuccess = createAction(
  TimeTrackingActionTypes.GetTimeEntriesSuccess,
  props<{ payload: DayEntry }>()
);

export const getTimeEntriesFail = createAction(
  TimeTrackingActionTypes.GetTimeEntriesFail,
  props<{ payload: BaseError }>()
);

/** CREATE DAY ENTRY */
export const createDayEntry = createAction(
  TimeTrackingActionTypes.CreateDayEntry,
  props<{ payload: ITimeEntry }>()
);

export const createDayEntrySuccess = createAction(
  TimeTrackingActionTypes.CreateDayEntrySuccess,
  props<{ payload: ITimeEntry }>()
);

export const createDayEntryFail = createAction(
  TimeTrackingActionTypes.CreateDayEntryFail,
  props<{ payload: BaseError }>()
);

/** UPDATE DAY ENTRY */
export const updateDayEntry = createAction(
  TimeTrackingActionTypes.UpdateDayEntry,
  props<{ payload: ITimeEntry }>()
);

export const updateDayEntrySuccess = createAction(
  TimeTrackingActionTypes.UpdateDayEntrySuccess,
  props<{ payload: ITimeEntry }>()
);

export const updateDayEntryFail = createAction(
  TimeTrackingActionTypes.UpdateDayEntryFail,
  props<{ payload: BaseError }>()
);
