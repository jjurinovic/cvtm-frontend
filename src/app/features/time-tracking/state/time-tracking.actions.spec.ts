import {
  testTimeEntriesRequest,
  testTimeEntry,
  testDayRequest,
  testDayEntry,
  testError,
} from 'src/test-data/data';
import * as TimeTrackingActions from './time-tracking.actions';
import { BaseError } from 'src/app/shared/models/error.model';
import { DayEntry } from '../models/day-entry.model';
import { ITimeEntry } from '../models/time-entry.model';
import { TimeEntriesRequest } from '../models/time-entries-request.model';

describe('Time Tracking Actions', () => {
  it('should getTimeEntries create action', () => {
    const payload: TimeEntriesRequest = testTimeEntriesRequest;
    const action = TimeTrackingActions.getTimeEntries({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetTimeEntries,
      payload,
    });
  });

  it('should getTimeEntriesSuccess create action', () => {
    const payload: DayEntry = testDayEntry;
    const action = TimeTrackingActions.getTimeEntriesSuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetTimeEntriesSuccess,
      payload,
    });
  });

  it('should getTimeEntriesFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.getTimeEntriesFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetTimeEntriesFail,
      payload,
    });
  });

  it('should createTimeEntry create action', () => {
    const payload: ITimeEntry = testTimeEntry;
    const action = TimeTrackingActions.createTimeEntry({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateTimeEntry,
      payload,
    });
  });

  it('should createTimeEntrySuccess create action', () => {
    const payload: ITimeEntry = testTimeEntry;
    const action = TimeTrackingActions.createTimeEntrySuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateTimeEntrySuccess,
      payload,
    });
  });

  it('should createTimeEntryFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.createTimeEntryFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateTimeEntryFail,
      payload,
    });
  });

  it('should updateTimeEntry update action', () => {
    const payload: ITimeEntry = testTimeEntry;
    const action = TimeTrackingActions.updateTimeEntry({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.UpdateTimeEntry,
      payload,
    });
  });

  it('should updateTimeEntrySuccess update action', () => {
    const payload: ITimeEntry = testTimeEntry;
    const action = TimeTrackingActions.updateTimeEntrySuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.UpdateTimeEntrySuccess,
      payload,
    });
  });

  it('should updateTimeEntryFail update action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.updateTimeEntryFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.UpdateTimeEntryFail,
      payload,
    });
  });
});
