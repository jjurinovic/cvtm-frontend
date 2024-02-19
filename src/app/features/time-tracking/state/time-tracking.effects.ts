import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import { TimeTrackingActionTypes } from './time-tracking.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TimeTrackingService } from '../services/time-tracking.service';
import { selectDate } from './time-tracking.selectors';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';

@Injectable()
export class TimeTrackingEffects {
  getTimeEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.GetTimeEntries),
      exhaustMap(({ payload }: any) =>
        this._time.getTimeEntries(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.GetTimeEntriesSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.GetTimeEntriesFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createTimeEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateTimeEntry),
      exhaustMap(({ payload }: any) =>
        this._time.createTimeEntry(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.CreateTimeEntrySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.CreateTimeEntryFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createTimeEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateTimeEntrySuccess),
      tap((data) => {
        this.dialog.closeAll();
        this._snackbar.success('Successfully added Time entry!');
      }),
      withLatestFrom(
        this.store.select(selectDate),
        this.store.select(selectCurrentUser)
      ),
      map(([_, date, user]) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: date, user_id: user.id },
      }))
    )
  );

  updateTimeEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.UpdateTimeEntry),
      exhaustMap(({ payload }: any) =>
        this._time.updateTimeEntry(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.UpdateTimeEntrySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.UpdateTimeEntryFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  updateTimeEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.UpdateTimeEntrySuccess),
      tap((data) => {
        this.dialog.closeAll();
        this._snackbar.success('Successfully updated Time entry!');
      }),
      map(({ payload }: any) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: payload.date, user_id: payload.user_id },
      })),
      withLatestFrom(
        this.store.select(selectDate),
        this.store.select(selectCurrentUser)
      ),
      map(([_, date, user]) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: date, user_id: user.id },
      }))
    )
  );

  deleteTimeEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.DeleteTimeEntry),
      exhaustMap(({ payload }: any) =>
        this._time.deleteTimeEntry(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.DeleteTimeEntrySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.DeleteTimeEntryFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  deleteDayEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.DeleteTimeEntrySuccess),
      tap((data) => {
        this.dialog.closeAll();
        this._snackbar.success('Successfully deleted Time entry!');
      }),
      withLatestFrom(
        this.store.select(selectDate),
        this.store.select(selectCurrentUser)
      ),
      map(([_, date, user]) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: date, user_id: user.id },
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private _snackbar: SnackbarService,
    private dialog: MatDialog,
    private _time: TimeTrackingService,
    private store: Store
  ) {}
}
