import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/features/users/models/user.model';
import { Company } from '../models/company.model';
import * as CompanyActions from './company.actions';

export interface State {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  companies: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(CompanyActions.getAll, (state) => ({ ...initialState, isLoading: true })),
  on(CompanyActions.getAllSuccess, (state, { payload }) => ({
    ...state,
    companies: payload,
  })),
  on(CompanyActions.getAllFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
    isLoading: false,
  }))
);
