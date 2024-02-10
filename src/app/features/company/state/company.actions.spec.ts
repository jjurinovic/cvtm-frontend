import { CompanyPageFilter } from '../models/company-page-filter.model';
import {
  testCompany,
  testCompanyPageResponse,
  testCompanyWithParams,
  testError,
  testIdWithParams,
  testPageFilter,
  testPageResponse,
} from '../../../../test-data/data';
import * as CompanyActions from './company.actions';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { Company, CompanyWithLocalParams } from '../models/company.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { IdWithParams } from 'src/app/shared/models/id-with-params.model';

describe('Company actions', () => {
  /** GET ALL */
  it('should getAll create an action', () => {
    const payload: CompanyPageFilter = testPageFilter;
    const action = CompanyActions.getAll({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetAll,
      payload,
    });
  });

  it('should getAllSuccess create an action', () => {
    const payload: PageResponse<Company> = testCompanyPageResponse;
    const action = CompanyActions.getAllSuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetAllSuccess,
      payload,
    });
  });

  it('should getAllFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.getAllFailure({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetAllFail,
      payload,
    });
  });

  /** CREATE COMPANY */
  it('should createCompany create an action', () => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;
    const action = CompanyActions.createCompany({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.CreateCompany,
      payload,
    });
  });

  it('should createCompanySuccess create an action', () => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;
    const action = CompanyActions.createCompanySuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.CreateCompanySuccess,
      payload,
    });
  });

  it('should createCompanyFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.createCompanyFail({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.CreateCompanyFail,
      payload,
    });
  });

  /** UPDATE COMPANY */
  it('should updateCompany create an action', () => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;
    const action = CompanyActions.updateCompany({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.UpdateCompany,
      payload,
    });
  });

  it('should updateCompanySuccess create an action', () => {
    const payload: CompanyWithLocalParams = testCompanyWithParams;
    const action = CompanyActions.updateCompanySuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.UpdateCompanySuccess,
      payload,
    });
  });

  it('should updateCompanyFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.updateCompanyFail({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.UpdateCompanyFail,
      payload,
    });
  });

  /** GET COMPANY */
  it('should getCompanyById create an action', () => {
    const payload: number = 1;
    const action = CompanyActions.getCompanyById({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetCompanyById,
      payload,
    });
  });

  it('should getCompanyByIdSuccess create an action', () => {
    const payload: Company = testCompany;
    const action = CompanyActions.getCompanyByIdSuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetCompanyByIdSuccess,
      payload,
    });
  });

  it('should getCompanyByIdFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.getCompanyByIdFail({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.GetCompanyByIdFail,
      payload,
    });
  });

  /** CHANGE STATUS */
  it('should changeStatus create an action', () => {
    const payload: number = 1;
    const action = CompanyActions.changeStatus({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.ChangeStatus,
      payload,
    });
  });

  it('should changeStatusSuccess create an action', () => {
    const payload: Company = testCompany;
    const action = CompanyActions.changeStatusSuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.ChangeStatusSuccess,
      payload,
    });
  });

  it('should changeStatusFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.changeStatusFail({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.ChangeStatusFail,
      payload,
    });
  });

  /** DELETE COMPANY */
  it('should deleteCompany create an action', () => {
    const payload: IdWithParams = testIdWithParams;
    const action = CompanyActions.deleteCompany({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.DeleteCompany,
      payload,
    });
  });

  it('should deleteCompanySuccess create an action', () => {
    const payload: Company = testCompany;
    const action = CompanyActions.deleteCompanySuccess({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.DeleteCompanySuccess,
      payload,
    });
  });

  it('should deleteCompanyFailure create an action', () => {
    const payload: BaseError = testError;
    const action = CompanyActions.deleteCompanyFail({ payload });

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.DeleteCompanyFail,
      payload,
    });
  });

  /** RESET COMPANY FORM */
  it('should resetCompanyForm create an action', () => {
    const action = CompanyActions.resetCompanyForm();

    expect({ ...action }).toEqual({
      type: CompanyActions.CompanyActionTypes.ResetCompanyForm,
    });
  });
});
