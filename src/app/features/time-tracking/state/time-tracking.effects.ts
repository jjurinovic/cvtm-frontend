import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { TimeTrackingActionTypes } from './time-tracking.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TimeTrackingService } from '../services/time-tracking.service';
import { of } from 'rxjs';

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

  createDayEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateTimeEntry),
      exhaustMap(({ payload }: any) =>
        this._time.createDayEntry(payload).pipe(
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

  createDayEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateTimeEntrySuccess),
      tap((data) => {
        this.dialog.closeAll();
        this._snackbar.success('Successfully added Time entry!');
      }),
      map(({ payload }: any) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: payload.date, user_id: payload.user_id },
      }))
    )
  );

  updateDayEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.UpdateTimeEntry),
      exhaustMap(({ payload }: any) =>
        this._time.updateDayEntry(payload).pipe(
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

  updateDayEntrySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.UpdateTimeEntrySuccess),
      tap((data) => {
        this.dialog.closeAll();
        this._snackbar.success('Successfully updated Time entry!');
      }),
      map(({ payload }: any) => ({
        type: TimeTrackingActionTypes.GetTimeEntries,
        payload: { date: payload.date, user_id: payload.user_id },
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private _snackbar: SnackbarService,
    private dialog: MatDialog,
    private _time: TimeTrackingService
  ) {}
}
