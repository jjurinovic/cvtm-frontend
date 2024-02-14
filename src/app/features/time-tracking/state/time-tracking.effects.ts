import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import {
  TimeTrackingActionTypes,
  createDaySuccess,
} from './time-tracking.actions';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TimeTrackingService } from '../services/time-tracking.service';
import { of } from 'rxjs';

@Injectable()
export class TimeTrackingEffects {
  createDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateDay),
      exhaustMap(({ payload }: any) =>
        this._time.createDay(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.CreateDaySuccess,
            payload: data.entries[0],
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.CreateDayFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createDaySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateDaySuccess),
      map((data) => ({
        type: TimeTrackingActionTypes.CreateDayEntry,
        payload: data,
      }))
    )
  );

  getDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.GetDay),
      exhaustMap(({ payload }: any) =>
        this._time.getDayById(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.GetDaySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.GetDayFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  createDayEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeTrackingActionTypes.CreateDayEntry),
      exhaustMap(({ payload }: any) =>
        this._time.createDayEntry(payload).pipe(
          map((data) => ({
            type: TimeTrackingActionTypes.CreateDayEntrySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: TimeTrackingActionTypes.CreateDayEntryFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _snackbar: SnackbarService,
    private dialogRef: MatDialog,
    private _time: TimeTrackingService
  ) {}
}
