import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import {
  CompanyActionTypes,
  createCompany,
  createCompanySuccess,
} from './company.actions';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CompanyEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.GetAll),
      map((data: any) => {
        let params = new HttpParams();
        params = params.append('size', data.payload.size);
        params = params.append('page', data.payload.page);
        return params;
      }),
      exhaustMap((params) =>
        this._company.getAllCompanies(params).pipe(
          map((data) => ({
            type: CompanyActionTypes.GetAllSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.GetAllFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  getAllSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(CompanyActionTypes.GetAllSuccess)),
    { dispatch: false }
  );

  createCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.CreateCompany),
      exhaustMap((payload) =>
        this._company.createCompany(payload).pipe(
          map((data) => ({
            type: CompanyActionTypes.CreateCompanySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.CreateCompanyFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  createCompanySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.CreateCompanySuccess),
        tap(() => {
          console.log('first');
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _company: CompanyService,
    private router: Router
  ) {}
}
