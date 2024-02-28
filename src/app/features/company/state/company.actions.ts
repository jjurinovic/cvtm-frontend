import { createAction, props } from '@ngrx/store';
import { Company, CompanyWithLocalParams } from '../models/company.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { IdWithParams } from 'src/app/shared/models/id-with-params.model';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { CompanyPageFilter } from '../models/company-page-filter.model';

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
  UpdateCompany = '[Company] Update Company',
  UpdateCompanySuccess = '[Company] Update Company Success',
  UpdateCompanyFail = '[Company] Update Company Fail',
  ChangeStatus = '[Company] Change status',
  ChangeStatusSuccess = '[Company] Change status Success',
  ChangeStatusFail = '[Company] Change status Fail',
  DeleteCompany = '[Company] Delete company',
  DeleteCompanySuccess = '[Company] Delete company Success',
  DeleteCompanyFail = '[Company] Delete company Fail',
  ResetCompanyForm = '[Company] Reset form',
  SetCompanyId = '[Company] Set company id',
}

export const getAll = createAction(
  CompanyActionTypes.GetAll,
  props<{ payload: CompanyPageFilter }>()
);

export const getAllSuccess = createAction(
  CompanyActionTypes.GetAllSuccess,
  props<{ payload: PageResponse<Company> }>()
);

export const getAllFailure = createAction(
  CompanyActionTypes.GetAllFail,
  props<{ payload: BaseError }>()
);

export const createCompany = createAction(
  CompanyActionTypes.CreateCompany,
  props<{ payload: CompanyWithLocalParams }>()
);

export const createCompanySuccess = createAction(
  CompanyActionTypes.CreateCompanySuccess,
  props<{ payload: CompanyWithLocalParams }>()
);

export const createCompanyFail = createAction(
  CompanyActionTypes.CreateCompanyFail,
  props<{ payload: BaseError }>()
);

export const updateCompany = createAction(
  CompanyActionTypes.UpdateCompany,
  props<{ payload: CompanyWithLocalParams }>()
);

export const updateCompanySuccess = createAction(
  CompanyActionTypes.UpdateCompanySuccess,
  props<{ payload: CompanyWithLocalParams }>()
);

export const updateCompanyFail = createAction(
  CompanyActionTypes.UpdateCompanyFail,
  props<{ payload: BaseError }>()
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
  props<{ payload: BaseError }>()
);

export const changeStatus = createAction(
  CompanyActionTypes.ChangeStatus,
  props<{ payload: number }>()
);

export const changeStatusSuccess = createAction(
  CompanyActionTypes.ChangeStatusSuccess,
  props<{ payload: Company }>()
);

export const changeStatusFail = createAction(
  CompanyActionTypes.ChangeStatusFail,
  props<{ payload: BaseError }>()
);

export const deleteCompany = createAction(
  CompanyActionTypes.DeleteCompany,
  props<{ payload: IdWithParams }>()
);

export const deleteCompanySuccess = createAction(
  CompanyActionTypes.DeleteCompanySuccess,
  props<{ payload: any }>()
);

export const deleteCompanyFail = createAction(
  CompanyActionTypes.DeleteCompanyFail,
  props<{ payload: BaseError }>()
);

export const resetCompanyForm = createAction(
  CompanyActionTypes.ResetCompanyForm
);

export const setCompanyId = createAction(
  CompanyActionTypes.SetCompanyId,
  props<{ payload: number }>
);
