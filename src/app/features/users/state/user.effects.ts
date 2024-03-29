import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  mergeMap,
  concatMap,
  switchMap,
  filter,
  withLatestFrom,
} from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';

import {
  UserActionTypes,
  currentUser,
  removeCurrentUser,
} from './users.actions';
import { UsersService } from '../services/users.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserWithLocalParams } from '../models/user.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { selectCurrentUser } from './user.selectors';
import { AuthService } from 'src/app/core/services/auth.service';
import { CompanyActionTypes } from '../../company/state/company.actions';
import { Role } from '../enums/role.enum';

@Injectable()
export class UserEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.GetAllUsers),
      exhaustMap(({ payload }: any) =>
        this._user.getAll(payload).pipe(
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
      exhaustMap(({ payload }: any) =>
        this._user.createUser(payload).pipe(
          map((data) => ({
            type: UserActionTypes.CreateUserSuccess,
            payload: { ...data, returnUrl: payload.returnUrl },
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
        tap(({ payload }: { payload: UserWithLocalParams }) => {
          this._snackbar.success('User successfully created!', 10000);
          if (payload.returnUrl) this.router.navigateByUrl(payload.returnUrl);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UpdateUser),
      exhaustMap(({ payload }: any) =>
        this._user.updateUser(payload).pipe(
          map((data) => {
            return {
              type: UserActionTypes.UpdateUserSuccess,
              payload: {
                ...data,
                myId: payload.myId,
                returnUrl: payload.returnUrl,
              },
            };
          }),
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
  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UpdateUserSuccess),
      concatMap((action: any) => {
        const { payload } = action;
        this._snackbar.success('User successfully updated!', 10000);

        if (payload.returnUrl) {
          this.router.navigateByUrl(payload.returnUrl);
        }

        const isCurrentUser = payload.id === payload.myId;

        if (isCurrentUser) {
          // Ovdje prvo pozivamo removeCurrentUser akciju, a zatim currentUser
          return of([removeCurrentUser(), currentUser()]);
        } else {
          return of(null); // Vraćamo EMPTY ako nije trenutno prijavljeni korisnik
        }
      }),
      mergeMap((actions) => (actions ? actions : EMPTY))
    )
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

  passwordChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.PasswordChange),
      exhaustMap((payload: any) =>
        this._user.changePassword(payload).pipe(
          map(() => ({
            type: UserActionTypes.PasswordChangeSuccess,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.PasswordChangeFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  passwordChangeSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.PasswordChangeSuccess),
        tap(() => {
          this._snackbar.success('Password successfully updated!', 10000);
          this.dialogRef.closeAll();
        })
      ),
    { dispatch: false }
  );

  changeStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.ChangeStatus),
      exhaustMap(({ payload }) =>
        this._user.statusChange(payload).pipe(
          map((data) => ({
            type: UserActionTypes.ChangeStatusSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.ChangeStatusFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  changeStatusSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.ChangeStatusSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('Status changed!', 10000);
        })
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.DeleteUser),
      exhaustMap(({ payload }: any) =>
        this._user.deleteUserSoft(payload.id).pipe(
          map((data) => ({
            type: UserActionTypes.DeleteUserSuccess,
            payload: { ...data, returnUrl: payload.returnUrl },
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.DeleteUserFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.DeleteUserSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('User successfully deleted!', 10000);

          if (payload.returnUrl) {
            this.router.navigateByUrl(payload.returnUrl);
          }
        })
      ),
    { dispatch: false }
  );

  restore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.Restore),
      exhaustMap(({ payload }) =>
        this._user.restore(payload).pipe(
          map((data) => ({
            type: UserActionTypes.RestoreSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.RestoreFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  restoreSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.RestoreSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('User successfully restored!', 10000);
        })
      ),
    { dispatch: false }
  );

  deleteUserHard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.DeleteUserHard),
      exhaustMap(({ payload }: any) =>
        this._user.deleteUser(payload.id).pipe(
          map((data) => ({
            type: UserActionTypes.DeleteUserHardSuccess,
            payload: payload.returnUrl,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.DeleteUserHardFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  deleteUserHardSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActionTypes.DeleteUserHardSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('User successfully deleted!', 10000);
          if (payload) {
            this.router.navigateByUrl(payload);
          }
        })
      ),
    { dispatch: false }
  );

  currentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.CurrentUser),
      withLatestFrom(this.store.select(selectCurrentUser)),
      filter(([action, currentUser]) => !currentUser),
      switchMap(() =>
        this._user.getCurrentUser().pipe(
          map((data) => ({
            type: UserActionTypes.CurrentUserSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: UserActionTypes.CurrentUserFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  currentUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.CurrentUserSuccess),
      tap((action: any) => {
        this._auth.setRole(action.payload.role);
      }),
      map(({ payload }) => {
        let companyId = payload.company_id;

        if (payload.role === Role.ROOT) {
          companyId = localStorage.getItem('cvtm-companyId');
          companyId = companyId ? parseInt(companyId) : companyId;
        }

        return {
          type: CompanyActionTypes.SetCompanyId,
          payload: companyId,
        };
      })
    )
  );

  constructor(
    private actions$: Actions,
    private _user: UsersService,
    private router: Router,
    private _snackbar: SnackbarService,
    private dialogRef: MatDialog,
    private _auth: AuthService,
    private store: Store
  ) {}
}
