import { createAction, props } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Company } from '../models/company.model';

export enum CompanyActionTypes {
  GetAll = '[Company] Get All',
  GetAllSuccess = '[Company] Get All Success',
  GetAllFail = '[Company] Get All Fail',
  CreateCompany = '[Company] Create new Company',
  CreateCompanySuccess = '[Company] Create new Company Success',
  CreateCompanyFail = '[Company] Create new Company Fail',
}

export const getAll = createAction(CompanyActionTypes.GetAll);

export const getAllSuccess = createAction(
  CompanyActionTypes.GetAllSuccess,
  props<{ payload: any }>()
);

export const getAllFailure = createAction(
  CompanyActionTypes.GetAllFail,
  props<{ payload: any }>()
);

export const createCompany = createAction(
  CompanyActionTypes.CreateCompany,
  props<{ payload: Company }>()
);

export const createCompanySuccess = createAction(
  CompanyActionTypes.CreateCompanySuccess
);

export const createCompanyFail = createAction(
  CompanyActionTypes.CreateCompanyFail
);
