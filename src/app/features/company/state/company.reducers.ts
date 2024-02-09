import { Action, createReducer, on } from '@ngrx/store';

import { Company } from '../models/company.model';
import * as CompanyActions from './company.actions';
import { CompanyPageFilter } from '../models/company-page-filter.model';

export interface State {
  pageFilter: CompanyPageFilter;
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  currentCompany: Company | null;
}

export const initialState: State = {
  companies: [],
  isLoading: false,
  error: null,
  currentCompany: null,
  pageFilter: {
    page: 1,
    size: 10,
    total: 0,
    q: null,
    sort: null,
    sort_field: null,
  },
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.getAll, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.getAllSuccess, (state, { payload }) => ({
    ...state,
    companies: payload.results,
    isLoading: false,
    pageFilter: payload.page_filter,
  })),
  on(CompanyActions.getAllFailure, (state, { payload }) => ({
    ...state,
    error: payload.detail,
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
  })),
  on(CompanyActions.deleteCompany, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.deleteCompanySuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.deleteCompanyFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.changeStatus, (state) => ({ ...state, isLoading: true })),
  on(CompanyActions.changeStatusSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    currentCompany: payload,
  })),
  on(CompanyActions.changeStatusFail, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(CompanyActions.resetCompanyForm, (state) => ({
    ...state,
    isLoading: false,
    currentCompany: null,
  }))
);
