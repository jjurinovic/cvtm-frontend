import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/features/users/models/user.model';
import { Company } from '../models/company.model';
import * as CompanyActions from './company.actions';

export interface State {
  companies: Company[];
  page: number | null;
  total: number | null;
  size: number | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  companies: [],
  isLoading: false,
  error: null,
  page: null,
  total: null,
  size: null,
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.getAll, (state) => ({ ...initialState, isLoading: true })),
  on(CompanyActions.getAllSuccess, (state, { payload }) => ({
    ...state,
    companies: payload.results,
    size: payload.size,
    total: payload.total,
    page: payload.page,
    isLoading: false,
  })),
  on(CompanyActions.getAllFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  }))
);
