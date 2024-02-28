import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './company.reducers';

const selectCompany = createFeatureSelector<State>('company');

export const selectAllCompanies = createSelector(
  selectCompany,
  (state) => state.companies
);

export const selectCompanyPageFilter = createSelector(
  selectCompany,
  (state) => state.pageFilter
);

export const selectCurrentCompany = createSelector(
  selectCompany,
  (state) => state.currentCompany
);

export const selectError = createSelector(
  selectCompany,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  selectCompany,
  (state) => state.isLoading
);

export const selectCompanyId = createSelector(
  selectCompany,
  (state) => state.companyId
);
