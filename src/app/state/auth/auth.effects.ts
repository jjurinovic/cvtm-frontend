import { Injectable } from '@angular/core';
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
import {
  AuthActionTypes,
  loginSuccess,
  currentUser,
  logout,
} from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Auth } from 'src/app/core/models/auth.model';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/features/users/services/users.service';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './auth.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      map((action: any) => action.payload),
      exhaustMap((payload: Auth) =>
        this._auth.login(payload.username, payload.password).pipe(
          map((data) => ({
            type: AuthActionTypes.LoginSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
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
        tap((action: any) => {
          localStorage.setItem('token', action.payload.access_token);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        tap((action: any) => {
          this._auth.removeToken();
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );

  currentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.CurrentUser),
      withLatestFrom(this.store.select(selectCurrentUser)),
      filter(([_, curr]) => {
        console.log(curr);
        return !curr;
      }),
      switchMap(() =>
        this._users.getCurrentUser().pipe(
          map((data) => ({
            type: AuthActionTypes.CurrentUserSuccess,
            payload: data,
          })),
          catchError(({ error }) => {
            console.log(error);
            return of({
              type: AuthActionTypes.CurrentUserFail,
              payload: { error: error.detail },
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _auth: AuthService,
    private router: Router,
    private _users: UsersService,
    private store: Store
  ) {}
}
