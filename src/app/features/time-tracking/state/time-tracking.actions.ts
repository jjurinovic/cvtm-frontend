import { createAction, props } from '@ngrx/store';

import { BaseError } from 'src/app/shared/models/error.model';
import { DayEntry } from '../models/day-entry.model';
import { TimeEntriesRequest } from '../models/time-entries-request.model';
import { ITimeEntry, TimeEntry } from '../models/time-entry.model';

export enum TimeTrackingActionTypes {
  GetTimeEntries = '[Time Tracking] Get Time Entries',
  GetTimeEntriesSuccess = '[Time Tracking] Get Time Entries Success',
  GetTimeEntriesFail = '[Time Tracking] Get Time Entries Fail',
  CreateTimeEntry = '[Time Tracking] Create Time Entry',
  CreateTimeEntrySuccess = '[Time Tracking] Create Time Entry Success',
  CreateTimeEntryFail = '[Time Tracking] Create Time Entry Fail',
  UpdateTimeEntry = '[Time Tracking] Update Time Entry',
  UpdateTimeEntrySuccess = '[Time Tracking] Update Time Entry Success',
  UpdateTimeEntryFail = '[Time Tracking] Update Time Entry Fail',
  DeleteTimeEntry = '[Time Tracking] Delete Time Entry',
  DeleteTimeEntrySuccess = '[Time Tracking] Delete Time Entry Success',
  DeleteTimeEntryFail = '[Time Tracking] Delete Time Entry Fail',
  SetDate = '[Time Tracking] Set date',
}

/** GET TIME ENTRIES*/
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

/** CREATE TIME ENTRY */
export const createTimeEntry = createAction(
  TimeTrackingActionTypes.CreateTimeEntry,
  props<{ payload: ITimeEntry }>()
);

export const createTimeEntrySuccess = createAction(
  TimeTrackingActionTypes.CreateTimeEntrySuccess,
  props<{ payload: ITimeEntry }>()
);

export const createTimeEntryFail = createAction(
  TimeTrackingActionTypes.CreateTimeEntryFail,
  props<{ payload: BaseError }>()
);

/** UPDATE TIME ENTRY */
export const updateTimeEntry = createAction(
  TimeTrackingActionTypes.UpdateTimeEntry,
  props<{ payload: ITimeEntry }>()
);

export const updateTimeEntrySuccess = createAction(
  TimeTrackingActionTypes.UpdateTimeEntrySuccess,
  props<{ payload: ITimeEntry }>()
);

export const updateTimeEntryFail = createAction(
  TimeTrackingActionTypes.UpdateTimeEntryFail,
  props<{ payload: BaseError }>()
);

/** DELETE TIME ENTRY */
export const deleteTimeEntry = createAction(
  TimeTrackingActionTypes.DeleteTimeEntry,
  props<{ payload: number }>()
);

export const deleteTimeEntrySuccess = createAction(
  TimeTrackingActionTypes.DeleteTimeEntrySuccess,
  props<{ payload: any }>()
);

export const deleteTimeEntryFail = createAction(
  TimeTrackingActionTypes.DeleteTimeEntryFail,
  props<{ payload: BaseError }>()
);

export const setDate = createAction(
  TimeTrackingActionTypes.SetDate,
  props<{ payload: string }>()
);
