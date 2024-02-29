import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';

import { CompanyActionTypes, setCompanyId } from './company.actions';
import { CompanyService } from '../services/company.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../../users/enums/role.enum';

@Injectable()
export class CompanyEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.GetAll),
      exhaustMap(({ payload }) =>
        this._company.getAllCompanies(payload).pipe(
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
          this.router.navigateByUrl('/company');
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

  getCompanyByIdFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.GetCompanyByIdFail),
        tap(() => {
          this.router.navigateByUrl('/company');
        })
      ),
    { dispatch: false }
  );

  changeStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.ChangeStatus),
      exhaustMap(({ payload }) =>
        this._company.statusChange(payload).pipe(
          map((data) => ({
            type: CompanyActionTypes.ChangeStatusSuccess,
            payload: data,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.ChangeStatusFail,
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
        ofType(CompanyActionTypes.ChangeStatusSuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('Status changed!', 10000);
        })
      ),
    { dispatch: false }
  );

  deleteCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompanyActionTypes.DeleteCompany),
      exhaustMap(({ payload }: any) =>
        this._company.deleteCompany(payload.id).pipe(
          map((data) => ({
            type: CompanyActionTypes.DeleteCompanySuccess,
            payload: payload.returnUrl,
          })),
          catchError(({ error }) =>
            of({
              type: CompanyActionTypes.DeleteCompanyFail,
              payload: error,
            })
          )
        )
      )
    )
  );

  deleteCompanySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.DeleteCompanySuccess),
        tap(({ payload }: any) => {
          this._snackbar.success('Company successfully deleted!', 10000);

          if (payload) {
            this.router.navigateByUrl(payload);
          }
        })
      ),
    { dispatch: false }
  );

  setCompanyId$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompanyActionTypes.SetCompanyId),
        tap(({ payload }) => {
          if (payload && this._auth.getRole() === Role.ROOT) {
            localStorage.setItem('cvtm-companyId', payload);
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _company: CompanyService,
    private router: Router,
    private _snackbar: SnackbarService,
    private _auth: AuthService
  ) {}
}
