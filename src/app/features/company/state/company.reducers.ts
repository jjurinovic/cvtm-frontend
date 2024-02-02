import { Action, createReducer, on } from '@ngrx/store';

import { Company } from '../models/company.model';
import * as CompanyActions from './company.actions';

export interface State {
  companies: Company[];
  page: number;
  total: number | null;
  size: number;
  isLoading: boolean;
  error: string | null;
  sort: string | null;
  sortField: string | null;
  q: string | null;
  currentCompany: Company | null;
}

export const initialState: State = {
  companies: [],
  isLoading: false,
  error: null,
  page: 1,
  total: null,
  size: 10,
  sort: null,
  sortField: null,
  q: null,
  currentCompany: null,
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.getAll, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.getAllSuccess, (state, { payload }) => ({
    ...state,
    companies: payload.results,
    size: payload.size,
    total: payload.total,
    page: payload.page,
    isLoading: false,
    sort: payload.sort,
    sortField: payload.sort_field,
    q: payload.q,
  })),
  on(CompanyActions.getAllFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  })),
  on(CompanyActions.createCompany, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.createCompanySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.createCompanyFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.getCompanyById, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.getCompanyByIdSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    currentCompany: payload,
  })),
  on(CompanyActions.getCompanyByIdFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.updateCompany, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.updateCompanySuccess, (state, { payload }) => ({
    ...state,
    currentCompany: payload,
    isLoading: false,
  })),
  on(CompanyActions.updateCompanyFail, (state) => ({
    ...state,
    isLoading: false,
  }))
);
