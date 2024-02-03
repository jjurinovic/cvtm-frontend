import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { CompanyActionTypes } from './company.actions';
import { CompanyService } from '../services/company.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Injectable()
export class CompanyEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.GetAll),
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
          this._snackbar.success('Company successfully created!', 10000);
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  updateCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.UpdateCompany),
      exhaustMap((payload) =>
        this._company.updateCompany(payload).pipe(
          map((data) => ({
            type: CompanyActionTypes.UpdateCompanySuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.UpdateCompanyFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  updateCompanySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.UpdateCompanySuccess),
        tap(() => {
          this._snackbar.success('Company successfully updated!', 10000);
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  getCompanyById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.GetCompanyById),
      exhaustMap(({ payload }) =>
        this._company.getCompanyById(payload).pipe(
          map((data) => ({
            type: CompanyActionTypes.GetCompanyByIdSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.GetCompanyByIdFail,
              payload: { error: error.detail },
            })
          )
        )
      )
    )
  );

  getCompanyByIdSuccess$ = createEffect(
    () => this.actions$.pipe(ofType(CompanyActionTypes.GetCompanyByIdSuccess)),
    { dispatch: false }
  );

  getCompanyByIdFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.GetCompanyByIdFail),
        tap(() => {
          this.router.navigateByUrl('/admin');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _company: CompanyService,
    private router: Router,
    private _snackbar: SnackbarService
  ) {}
}
