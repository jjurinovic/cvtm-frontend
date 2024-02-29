import { testCompanies, testCompany, testPageFilter } from 'src/test-data/data';
import { State } from './company.reducers';
import {
  selectAllCompanies,
  selectCompanyPageFilter,
  selectCurrentCompany,
  selectError,
  selectIsLoading,
} from './company.selectors';

describe('Company Selectors', () => {
  const state: State = {
    companies: testCompanies,
    currentCompany: testCompany,
    error: 'error',
    isLoading: false,
    pageFilter: testPageFilter,
    companyId: 999,
  };

  it('should selectAllCompanies return users array', () => {
    expect(selectAllCompanies.projector(state)).toBeDefined();
    expect(selectAllCompanies.projector(state).length).toEqual(
      testCompanies.length
    );
    expect(selectAllCompanies.projector(state)).toEqual(testCompanies);
  });

  it('should selectCompanyPageFilter return page filter', () => {
    expect(selectCompanyPageFilter.projector(state)).toBeDefined();
    expect(selectCompanyPageFilter.projector(state)).toEqual(testPageFilter);
  });

  it('should selectCurrentCompany return user', () => {
    expect(selectCurrentCompany.projector(state)).toBeDefined();
    expect(selectCurrentCompany.projector(state)).toEqual(testCompany);
  });

  it('should selectError return error', () => {
    expect(selectError.projector(state)).toBeDefined();
    expect(selectError.projector(state)).toEqual('error');
  });

  it('should selectIsLoading return error', () => {
    expect(selectIsLoading.projector(state)).toBeDefined();
    expect(selectIsLoading.projector(state)).toEqual(false);
  });
  //TODO: add missing test for
});
