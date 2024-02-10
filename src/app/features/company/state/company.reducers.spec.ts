import * as fromReducer from './company.reducers';
import * as CompanyActions from './company.actions';
import {
  testCompanies,
  testCompany,
  testCompanyPageResponse,
  testCompanyWithParams,
  testError,
  testIdWithParams,
  testPageFilter,
} from '../../../../test-data/data';

describe('Company reducers', () => {
  const { initialState } = fromReducer;

  it('unknown action should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  /** GET ALL */
  it('getAll should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.getAll({ payload: testPageFilter });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getAllSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      pageFilter: testPageFilter,
      companies: testCompanies,
    };

    const action = CompanyActions.getAllSuccess({
      payload: testCompanyPageResponse,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getAllFailure should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.getAllFailure({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** CREATE COMPANY */
  it('createCompany should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.createCompany({
      payload: testCompanyWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createCompanySuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = CompanyActions.createCompanySuccess({
      payload: testCompanyWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createCompanyFailure should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.createCompanyFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** GET COMPANY */
  it('getCompanyById should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.getCompanyById({
      payload: 1,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getCompanyByIdSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      currentCompany: testCompany,
    };

    const action = CompanyActions.getCompanyByIdSuccess({
      payload: testCompany,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getCompanyByIdFail should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.getCompanyByIdFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** UPDATE COMPANY */
  it('updateCompany should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.updateCompany({
      payload: testCompanyWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateCompanySuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      currentCompany: testCompanyWithParams,
    };

    const action = CompanyActions.updateCompanySuccess({
      payload: testCompanyWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateCompanyFail should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.updateCompanyFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** DELETE COMPANY */
  it('deleteCompany should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.deleteCompany({
      payload: testIdWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteCompanySuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = CompanyActions.deleteCompanySuccess({
      payload: {},
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteCompanyFail should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.deleteCompanyFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** CHANGE STATUS */
  it('changeStatus should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = CompanyActions.changeStatus({
      payload: 1,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('changeStatusSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      currentCompany: testCompany,
    };

    const action = CompanyActions.changeStatusSuccess({
      payload: testCompany,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('changeStatusFail should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      error: testError.detail,
    };

    const action = CompanyActions.changeStatusFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  /** RESET FORM */
  it('resetCompanyForm should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      currentCompany: null,
    };

    const action = CompanyActions.resetCompanyForm();
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });
});
