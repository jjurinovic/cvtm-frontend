import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthActionTypes, loginSuccess } from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Auth } from 'src/app/core/models/auth.model';
import { Router } from '@angular/router';

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
            payload: data.access_token,
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
          localStorage.setItem('token', action.payload);
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

  constructor(
    private actions$: Actions,
    private _auth: AuthService,
    private router: Router
  ) {}
}
