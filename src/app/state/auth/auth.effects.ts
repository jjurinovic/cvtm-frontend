import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthActionTypes } from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { Auth } from 'src/app/core/models/auth.model';

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
          catchError(() =>
            of({
              type: AuthActionTypes.LoginFail,
              payload: { error: 'Login Error' },
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private _auth: AuthService) {}
}
