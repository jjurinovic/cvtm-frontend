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
  GetCompanyById = '[Company] Get Company by Id',
  GetCompanyByIdSuccess = '[Company] Get Company by Id Success',
  GetCompanyByIdFail = '[Company] Get Company by Id Fail',
}

export const getAll = createAction(
  CompanyActionTypes.GetAll,
  props<{ payload: any }>()
);

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

export const getCompanyById = createAction(
  CompanyActionTypes.GetCompanyById,
  props<{ payload: number }>()
);

export const getCompanyByIdSuccess = createAction(
  CompanyActionTypes.GetCompanyByIdSuccess,
  props<{ payload: Company }>()
);

export const getCompanyByIdFail = createAction(
  CompanyActionTypes.GetCompanyByIdFail,
  props<{ payload: any }>()
);
