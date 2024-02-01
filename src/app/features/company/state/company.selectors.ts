import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './company.reducers';

const selectCompany = createFeatureSelector<State>('company');

export const selectAllCompanies = createSelector(
  selectCompany,
  (state) => state.companies
);

export const selectTotalCompanies = createSelector(
  selectCompany,
  (state) => state.total
);

export const selectPageCompanies = createSelector(
  selectCompany,
  (state) => state.page
);

export const selectSizeCompanies = createSelector(
  selectCompany,
  (state) => state.size
);

export const selectSortCompanies = createSelector(
  selectCompany,
  (state) => state.sort
);

export const selectSortFieldCompanies = createSelector(
  selectCompany,
  (state) => state.sortField
);

export const selectSearchCompanies = createSelector(
  selectCompany,
  (state) => state.q
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
