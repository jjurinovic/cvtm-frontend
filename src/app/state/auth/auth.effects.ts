import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  tap,
  withLatestFrom,
  filter,
  switchMap,
} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { AuthActionTypes } from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Auth } from 'src/app/core/models/auth.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { selectCurrentUser } from './auth.selectors';
import { Role } from 'src/app/features/users/enums/role.enum';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { BaseError } from '../../shared/models/error';
import { returnUrlQueryParam } from 'src/app/utils/url';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      map((action: any) => action.payload),
      exhaustMap((payload: Auth) =>
        this._auth.login(payload.username, payload.password).pipe(
          map((data: AuthResponse) => ({
            type: AuthActionTypes.LoginSuccess,
            payload: data,
          })),
          catchError(({ error }: { error: BaseError }) =>
            of({
              type: AuthActionTypes.LoginFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(({ payload }: { payload: AuthResponse }) => {
          this._auth.setToken(payload.access_token);
          this._auth.setRole(payload.user.role);

          const returnUrl = this.route.snapshot.queryParams['returnUrl'];

          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            if (this._auth.getRole() === Role.ROOT) {
              this.router.navigateByUrl('/admin');
            } else {
              this.router.navigateByUrl('/');
            }
          }
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        tap(({ payload }) => {
          this._auth.removeToken();
          this.dialog.closeAll();

          let returnUrl = '';
          if (payload) returnUrl = returnUrlQueryParam(this.router.url);
          this.router.navigateByUrl('/login' + returnUrl);
        })
      ),
    { dispatch: false }
  );

  currentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.CurrentUser),
      withLatestFrom(this.store.select(selectCurrentUser)),
      filter(([action, currentUser]) => !currentUser),
      switchMap(() =>
        this._users.getCurrentUser().pipe(
          map((data) => ({
            type: AuthActionTypes.CurrentUserSuccess,
            payload: data,
          })),
          catchError(({ error }) => {
            return of({
              type: AuthActionTypes.CurrentUserFail,
              payload: { error: error.detail },
            });
          })
        )
      )
    )
  );

  currentUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.CurrentUserSuccess),
        tap((action: any) => {
          this._auth.setRole(action.payload.role);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _auth: AuthService,
    private router: Router,
    private _users: UsersService,
    private store: Store,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}
}
