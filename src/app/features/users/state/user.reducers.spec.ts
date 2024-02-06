import { BaseError } from 'src/app/shared/models/error';
import { User, UserWithReturnUrl } from '../models/user.model';
import * as fromReducer from './user.reducers';
import * as UserActions from './users.actions';

const testUser: User = {
  first_name: 'test first name',
  last_name: 'test last name',
  company_id: 1,
  email: 'test@email.com',
  id: 999,
  role: 0,
};

const userWithReturnUrl: UserWithReturnUrl = {
  ...testUser,
  returnUrl: '/test',
};

const testError: BaseError = { detail: 'test error' };

describe('User reducers', () => {
  it('unknown action should return the default state', () => {
    const { initialState } = fromReducer;
    const action = {
      type: 'Unknown',
    };
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('createUser should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.createUser({ payload: userWithReturnUrl });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createUserSuccess should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.createUserSuccess({
      payload: userWithReturnUrl,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createUserFail should return the new state with error', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.createUserFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateUser should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.updateUser({ payload: userWithReturnUrl });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateUserSuccess should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.updateUserSuccess({
      payload: userWithReturnUrl,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateUserFail should return the new state with error', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.updateUserFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getUserById should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.getUserById({ payload: 1 });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getUserByIdSuccess should return the new state with user data', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: userWithReturnUrl,
    };

    const action = UserActions.getUserByIdSuccess({
      payload: userWithReturnUrl,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getUserByIdFail should return the new state with error', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.getUserByIdFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getAllUsers should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.getAllUsers({
      payload: { page: 1, size: 10, companyId: 1 },
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getAllUsersSuccess should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      users: [],
      size: 10,
      total: 10,
      page: 1,
      sort: null,
      sortField: null,
      q: null,
    };

    const action = UserActions.getAllUsersSuccess({
      payload: {
        results: [],
        size: 10,
        total: 10,
        page: 1,
        sort: null,
        sort_field: null,
        q: null,
      },
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getAllUsersFail should return the new state with error', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.getAllUsersFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('resetUserForm should return the new state with no user data', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      user: null,
    };

    const action = UserActions.resetUserForm();
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('passwordChange should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.passwordChange({
      payload: { new_password: 'new', old_password: 'old' },
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('passwordChangeSuccess should return the new state', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.passwordChangeSuccess();
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('passwordChangeFail should return the new state with error', () => {
    const { initialState } = fromReducer;
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.passwordChangeFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });
});
