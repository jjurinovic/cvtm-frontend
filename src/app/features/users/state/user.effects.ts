import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { UserActionTypes } from './users.actions';
import { UsersService } from '../services/users.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserWithReturnUrl } from '../models/user.model';
import { BaseError } from 'src/app/shared/models/error';

@Injectable()
export class UserEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.GetAllUsers),
      exhaustMap(({ payload }: any) =>
        this._user
          .getAll(
            payload.companyId,
            payload.page,
            payload.size,
            payload.sort,
            payload.sortField,
            payload.q
          )
          .pipe(
            map((data) => ({
              type: UserActionTypes.GetAllUsersSuccess,
              payload: data,
            })),
            catchError(({ error }) =>
              of({
                type: UserActionTypes.GetAllUsersFail,
                payload: error,
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
      exhaustMap((payload: UserWithReturnUrl) =>
        this._user.createUser(payload).pipe(
          map((data) => ({
            type: UserActionTypes.CreateUserSuccess,
            payload: data,
          })),
          catchError(({ error }: { error: BaseError }) =>
            of({
              type: UserActionTypes.CreateUserFail,
              payload: error,
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
        tap(({ payload }: { payload: UserWithReturnUrl }) => {
          this._snackbar.success('User successfully created!', 10000);
          this.router.navigateByUrl(payload.returnUrl);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UpdateUser),
      exhaustMap((payload: any) =>
        this._user.updateUser(payload).pipe(
          map((data) => ({
            type: UserActionTypes.UpdateUserSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.UpdateUserFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.UpdateUserSuccess),
        tap((data: any) => {
          this._snackbar.success('User successfully updated!', 10000);
          if (data.payload.returnUrl) {
            this.router.navigateByUrl(data.payload.returnUrl);
          }
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
              payload: error,
            })
          )
        )
      )
    )
  );

  getUserByIdSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(UserActionTypes.GetUserByIdSuccess)),
    { dispatch: false }
  );

  getUserByIdFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.GetUserByIdFail),
        tap(() => {
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _user: UsersService,
    private router: Router,
    private _snackbar: SnackbarService
  ) {}
}
