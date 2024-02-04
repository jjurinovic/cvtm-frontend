import { BaseError } from 'src/app/shared/models/error';
import { User, UserWithReturnUrl } from '../models/user.model';
import * as UserActions from './users.actions';
import { UserActionTypes, resetUserForm } from './users.actions';
import { UsersRequest } from '../models/users-request';
import { PageResponse } from 'src/app/shared/models/page-response';

const testUser: User = {
  first_name: 'test first name',
  last_name: 'test last name',
  company_id: 1,
  email: 'test@email.com',
  id: 999,
  role: 0,
};

const testError: BaseError = {
  detail: 'test error',
};

describe('CreateUser', () => {
  it('should create an action', () => {
    const payload: UserWithReturnUrl = { ...testUser, returnUrl: '/test' };
    const action = UserActions.createUser({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.CreateUser,
      payload,
    });
  });
});

describe('CreateUserSuccess', () => {
  it('should create an action', () => {
    const payload: UserWithReturnUrl = { ...testUser, returnUrl: '/test' };
    const action = UserActions.createUserSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.CreateUserSuccess,
      payload,
    });
  });
});

describe('CreateUserFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.createUserFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.CreateUserFail,
      payload,
    });
  });
});

describe('UpdateUser', () => {
  it('should create an action', () => {
    const payload: UserWithReturnUrl = { ...testUser, returnUrl: '/test' };
    const action = UserActions.updateUser({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.UpdateUser,
      payload,
    });
  });
});

describe('UpdateUserSuccess', () => {
  it('should create an action', () => {
    const payload: UserWithReturnUrl = { ...testUser, returnUrl: '/test' };
    const action = UserActions.updateUserSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.UpdateUserSuccess,
      payload,
    });
  });
});

describe('UpdateUserFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.updateUserFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.UpdateUserFail,
      payload,
    });
  });
});

describe('GetUserById', () => {
  it('should create an action', () => {
    const action = UserActions.getUserById({ payload: 1 });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetUserById,
      payload: 1,
    });
  });
});

describe('GetUserByIdSuccess', () => {
  it('should create an action', () => {
    const payload = testUser;
    const action = UserActions.getUserByIdSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetUserByIdSuccess,
      payload: testUser,
    });
  });
});

describe('GetUserByIdFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.getUserByIdFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetUserByIdFail,
      payload,
    });
  });
});

describe('GetAllUsers', () => {
  it('should create an action', () => {
    const payload: UsersRequest = {
      companyId: 999,
      page: 1,
      size: 2,
    };
    const action = UserActions.getAllUsers({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetAllUsers,
      payload,
    });
  });
});

describe('GetAllUsersSuccess', () => {
  it('should create an action', () => {
    const payload: PageResponse<User> = {
      results: [],
      size: 10,
      page: 1,
      total: 0,
      sort: null,
      sort_field: null,
      q: null,
    };
    const action = UserActions.getAllUsersSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetAllUsersSuccess,
      payload,
    });
  });
});

describe('GetAllUsersFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.getAllUsersFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.GetAllUsersFail,
      payload,
    });
  });
});

describe('ResetUserForm', () => {
  it('should create an action', () => {
    const action = UserActions.resetUserForm();

    expect({ ...action }).toEqual({
      type: UserActionTypes.ResetUserForm,
    });
  });
});
