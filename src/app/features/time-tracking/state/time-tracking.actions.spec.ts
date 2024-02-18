import {
  testDay,
  testDayEntry,
  testDayRequest,
  testDays,
  testError,
} from 'src/test-data/data';
import { DayRequest } from '../models/time-entries-request.model';
import * as TimeTrackingActions from './time-tracking.actions';
import { Day } from '../models/day.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { DayEntry } from '../models/day-entry.model';

describe('Time Tracking Actions', () => {
  it('should createDay create action', () => {
    const payload: DayRequest = testDayRequest;
    const action = TimeTrackingActions.createDay({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateDay,
      payload,
    });
  });

  it('should createDaySuccess create action', () => {
    const payload: Day = testDay;
    const action = TimeTrackingActions.createDaySuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateDaySuccess,
      payload,
    });
  });

  it('should createDayFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.createDayFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.CreateDayFail,
      payload,
    });
  });

  it('should getDay create action', () => {
    const payload: Day = testDay;
    const action = TimeTrackingActions.getDay({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDay,
      payload,
    });
  });

  it('should getDaySuccess create action', () => {
    const payload: Day = testDay;
    const action = TimeTrackingActions.getDaySuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDaySuccess,
      payload,
    });
  });

  it('should getDayFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.getDayFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDayFail,
      payload,
    });
  });

  it('should getDays create action', () => {
    const payload: DayRequest = testDayRequest;
    const action = TimeTrackingActions.getDays({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDays,
      payload,
    });
  });

  it('should getDaysSuccess create action', () => {
    const payload: Day[] = testDays;
    const action = TimeTrackingActions.getDaysSuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDaysSuccess,
      payload,
    });
  });

  it('should getDaysFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.getDaysFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDaysFail,
      payload,
    });
  });

  it('should getDayEntry create action', () => {
    const payload: DayEntry = testDayEntry;
    const action = TimeTrackingActions.getDayEntry({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDayEntry,
      payload,
    });
  });

  it('should getDayEntrySuccess create action', () => {
    const payload: DayEntry = testDayEntry;
    const action = TimeTrackingActions.getDayEntrySuccess({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDayEntrySuccess,
      payload,
    });
  });

  it('should getDayEntryFail create action', () => {
    const payload: BaseError = testError;
    const action = TimeTrackingActions.getDayEntryFail({ payload });

    expect(action).toEqual({
      type: TimeTrackingActions.TimeTrackingActionTypes.GetDayEntryFail,
      payload,
    });
  });
});
