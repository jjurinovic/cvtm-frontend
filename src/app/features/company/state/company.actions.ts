import { createAction, props } from '@ngrx/store';
import { Auth } from 'src/app/core/models/auth.model';
import { Company } from '../models/company.model';

export enum CompanyActionTypes {
  GetAll = '[Company] Get All',
  GetAllSuccess = '[Company] Get All Success',
  GetAllFail = '[Company] Get All Fail',
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
