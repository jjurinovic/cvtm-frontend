import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { TestBed } from '@angular/core/testing';

import { CompanyEffects } from './company.effects';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CompanyService } from '../services/company.service';
import { initialState } from './company.reducers';
import {
  testCompany,
  testCompanyPageResponse,
  testCompanyWithParams,
  testError,
  testIdWithParams,
} from 'src/test-data/data';
import { CompanyPageFilter } from '../models/company-page-filter.model';
import { testPageFilter } from '../../../../test-data/data';
import * as CompanyActions from './company.actions';
import { CompanyWithLocalParams } from '../models/company.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { IdWithParams } from 'src/app/shared/models/id-with-params.model';

describe('CompanyEffects', () => {
  let actions$: Observable<Action>;
  let effects: CompanyEffects;
  let companyServiceSpy: any;
  let store: MockStore;
  let router: Router;
  let snackService: SnackbarService;

  beforeEach(() => {
    companyServiceSpy = jasmine.createSpyObj('CompanyService', [
      'getAllCompanies',
      'getCompanyById',
      'createCompany',
      'updateCompany',
      'deleteCompany',
      'statusChange',
    ]);

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        CompanyEffects,
        {
          provide: CompanyService,
          useValue: companyServiceSpy,
        },
        provideMockStore({
          initialState: initialState,
        }),
      ],
    });
    effects = TestBed.inject(CompanyEffects);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    snackService = TestBed.inject(SnackbarService);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigateByUrl');
    spyOn(snackService, 'success').and.callThrough();
  });

  /** GET ALL */
  it('should call getAll$ and return response', (done) => {
    companyServiceSpy.getAllCompanies.and.returnValue(
      of(testCompanyPageResponse)
    );

    const payload: CompanyPageFilter = { ...testPageFilter };

    actions$ = of(CompanyActions.getAll({ payload }));
    effects.getAll$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.GetAllSuccess,
        payload: testCompanyPageResponse,
      });
      done();
    });
  });

  it('should call getAll$ and return error', (done) => {
    companyServiceSpy.getAllCompanies.and.throwError(testError);

    const payload: CompanyPageFilter = { ...testPageFilter };

    actions$ = of(CompanyActions.getAll({ payload }));
    effects.getAll$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  /** CREATE COMPANY */
  it('should call createCompany$ and return response', (done) => {
    companyServiceSpy.createCompany.and.returnValue(of(testCompany));

    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.createCompany({ payload }));
    effects.createCompany$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.CreateCompanySuccess,
        payload: testCompany,
      });
      done();
    });
  });

  it('should call createCompany$ and return error', (done) => {
    companyServiceSpy.createCompany.and.throwError(testError);

    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.createCompany({ payload }));
    effects.createCompany$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call createCompanySuccess$ and show message and navigate', (done) => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.createCompanySuccess({ payload }));
    effects.createCompanySuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  /** UPDATE COMPANY */
  it('should call updateCompany$ and return response', (done) => {
    companyServiceSpy.updateCompany.and.returnValue(of(testCompany));

    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.updateCompany({ payload }));
    effects.updateCompany$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.UpdateCompanySuccess,
        payload: testCompany,
      });
      done();
    });
  });

  it('should call updateCompany$ and return error', (done) => {
    companyServiceSpy.updateCompany.and.throwError(testError);

    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.updateCompany({ payload }));
    effects.updateCompany$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call updateCompanySuccess$ and show message and navigate', (done) => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.updateCompanySuccess({ payload }));
    effects.updateCompanySuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/company');
  });

  /** GET COMPANY */
  it('should call getCompanyById$ and return response', (done) => {
    companyServiceSpy.getCompanyById.and.returnValue(of(testCompany));

    const payload: number = 1;

    actions$ = of(CompanyActions.getCompanyById({ payload }));
    effects.getCompanyById$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.GetCompanyByIdSuccess,
        payload: testCompany,
      });
      done();
    });
  });

  it('should call getCompanyById$ and return error', (done) => {
    companyServiceSpy.getCompanyById.and.throwError(testError);

    const payload: number = 1;

    actions$ = of(CompanyActions.getCompanyById({ payload }));
    effects.getCompanyById$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call getCompanyByIdFail$ and navigate by url', (done) => {
    const payload: BaseError = testError;

    actions$ = of(CompanyActions.getCompanyByIdFail({ payload }));
    effects.getCompanyByIdFail$.subscribe(() => done());

    expect(router.navigateByUrl).toHaveBeenCalledWith('/company');
  });

  /** CHANGE STATUS */
  it('should call changeStatus$ and return response', (done) => {
    companyServiceSpy.statusChange.and.returnValue(of(testCompany));

    const payload: number = 1;

    actions$ = of(CompanyActions.changeStatus({ payload }));
    effects.changeStatus$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.ChangeStatusSuccess,
        payload: testCompany,
      });
      done();
    });
  });

  it('should call changeStatus$ and return error', (done) => {
    companyServiceSpy.statusChange.and.throwError(testError);

    const payload: number = 1;

    actions$ = of(CompanyActions.changeStatus({ payload }));
    effects.changeStatus$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call changeStatusSuccess$ and show message and navigate', (done) => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;

    actions$ = of(CompanyActions.changeStatusSuccess({ payload }));
    effects.changeStatusSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
  });

  /** DELETE COMPANY */
  it('should call deleteCompany$ and return response', (done) => {
    companyServiceSpy.deleteCompany.and.returnValue(of(testCompany));

    const payload: IdWithParams = testIdWithParams;

    actions$ = of(CompanyActions.deleteCompany({ payload }));
    effects.deleteCompany$.subscribe((action) => {
      expect(action).toEqual({
        type: CompanyActions.CompanyActionTypes.DeleteCompanySuccess,
        payload: payload.returnUrl,
      });
      done();
    });
  });

  it('should call deleteCompany$ and return error', (done) => {
    companyServiceSpy.deleteCompany.and.throwError(testError);

    const payload: IdWithParams = testIdWithParams;

    actions$ = of(CompanyActions.deleteCompany({ payload }));
    effects.deleteCompany$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call deleteCompanySuccess$ and show message and navigate', (done) => {
    const payload: string = '/test';

    actions$ = of(CompanyActions.deleteCompanySuccess({ payload }));
    effects.deleteCompanySuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith(payload as string);
  });

  it('should call deleteCompanySuccess$ and show message and not navigate', (done) => {
    let payload = null;

    actions$ = of(CompanyActions.deleteCompanySuccess({ payload }));
    effects.deleteCompanySuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
