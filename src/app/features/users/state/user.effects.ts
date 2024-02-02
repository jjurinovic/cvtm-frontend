import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  UserActionTypes,
  getAllUsersFail,
  updateUser,
  getUserById,
} from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UserEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.GetAllUsers),
      map((data: any) => {
        let params = new HttpParams();
        params = params.append('size', data.payload.size);
        params = params.append('page', data.payload.page);

        if (data.payload.sort) {
          params = params.append('sort', data.payload.sort);
          params = params.append('sort_field', data.payload.sortField);
        }

        if (data.payload.q) {
          params = params.append('q', data.payload.q);
        }
        return params;
      }),
      exhaustMap((params) =>
        this._user.getAll(params).pipe(
          map((data) => ({
            type: UserActionTypes.GetAllUsersSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.GetAllUsersFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  getAllSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(UserActionTypes.GetAllUsersSuccess)),
    { dispatch: false }
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.CreateUser),
      exhaustMap((payload) =>
        this._user.createUser(payload).pipe(
          map((data) => ({
            type: UserActionTypes.CreateUserSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.CreateUserFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.CreateUserSuccess),
        tap(() => {
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UpdateUser),
      exhaustMap((payload) =>
        this._user.updateUser(payload).pipe(
          map((data) => ({
            type: UserActionTypes.UpdateUserSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.UpdateUserFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.UpdateUser),
        tap(() => {
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.GetUserById),
      exhaustMap(({ payload }) =>
        this._user.getUserById(payload).pipe(
          map((data) => ({
            type: UserActionTypes.GetUserByIdSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.GetUserByIdFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  getUserByIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.GetUserByIdSuccess),
        tap(() => {
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _user: UsersService,
    private router: Router
  ) {}
}
