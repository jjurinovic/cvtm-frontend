import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './company.reducers';

const selectCompany = createFeatureSelector<State>('company');

export const selectAllCompanies = createSelector(
  selectCompany,
  (state) => state.companies
);

export const selectError = createSelector(
  selectCompany,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectCompany,
  (state) => state.isLoading
);
