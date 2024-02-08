import * as fromReducer from './user.reducers';
import * as UserActions from './users.actions';
import {
  testError,
  testIdWithParams,
  testUser,
  userWithLocalProps,
} from 'src/test-data/data';

describe('User reducers', () => {
  const { initialState } = fromReducer;

  it('unknown action should return the default state', () => {
    const action = {
      type: 'Unknown',
    };
    const state = fromReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('createUser should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.createUser({ payload: userWithLocalProps });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createUserSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.createUserSuccess({
      payload: userWithLocalProps,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('createUserFail should return the new state with error', () => {
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
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.updateUser({ payload: userWithLocalProps });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateUserSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.updateUserSuccess({
      payload: userWithLocalProps,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('updateUserFail should return the new state with error', () => {
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
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.getUserById({ payload: 1 });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getUserByIdSuccess should return the new state with user data', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: userWithLocalProps,
    };

    const action = UserActions.getUserByIdSuccess({
      payload: userWithLocalProps,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('getUserByIdFail should return the new state with error', () => {
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
    const newState: fromReducer.State = {
      ...initialState,
      user: null,
    };

    const action = UserActions.resetUserForm();
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('passwordChange should return the new state', () => {
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
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
    };

    const action = UserActions.passwordChangeSuccess();
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('passwordChangeFail should return the new state with error', () => {
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

  it('changeStatus should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.changeStatus({
      payload: 1,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('changeStatusSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: testUser,
    };
    const payload = testUser;

    const action = UserActions.changeStatusSuccess({ payload });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('changeStatusFail should return the new state with error', () => {
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.changeStatusFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUser should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.deleteUser({
      payload: testIdWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUserSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: userWithLocalProps,
    };
    const payload = userWithLocalProps;

    const action = UserActions.deleteUserSuccess({ payload });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUserFail should return the new state with error', () => {
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.deleteUserFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUserHard should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.deleteUserHard({
      payload: testIdWithParams,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUserHardSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: null,
    };

    const action = UserActions.deleteUserHardSuccess({ payload: '/test' });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('deleteUserHardFail should return the new state with error', () => {
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.deleteUserHardFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('restore should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: true,
    };

    const action = UserActions.restore({
      payload: 1,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('restoreSuccess should return the new state', () => {
    const newState: fromReducer.State = {
      ...initialState,
      isLoading: false,
      user: testUser,
    };

    const action = UserActions.restoreSuccess({ payload: testUser });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });

  it('restoreFail should return the new state with error', () => {
    const newState: fromReducer.State = {
      ...initialState,
      error: testError.detail,
    };

    const action = UserActions.restoreFail({
      payload: testError,
    });
    const state = fromReducer.reducer(initialState, action);

    expect(state).toEqual(newState);
  });
});
