import { BaseError } from 'src/app/shared/models/error.model';
import { User, UserWithLocalParams } from '../models/user.model';
import * as UserActions from './users.actions';
import { UserActionTypes } from './users.actions';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { PasswordChange } from '../models/password-change.model';
import {
  testError,
  testIdWithParams,
  testPageFilter,
  testUser,
  userWithLocalParams,
} from '../../../../test-data/data';
import { UsersPageFilter } from '../models/users-page-filter.model';

describe('CreateUser', () => {
  it('should create an action', () => {
    const payload: UserWithLocalParams = { ...testUser, returnUrl: '/test' };
    const action = UserActions.createUser({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.CreateUser,
      payload,
    });
  });
});

describe('CreateUserSuccess', () => {
  it('should create an action', () => {
    const payload: UserWithLocalParams = { ...testUser, returnUrl: '/test' };
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
    const payload: UserWithLocalParams = { ...testUser, returnUrl: '/test' };
    const action = UserActions.updateUser({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.UpdateUser,
      payload,
    });
  });
});

describe('UpdateUserSuccess', () => {
  it('should create an action', () => {
    const payload: UserWithLocalParams = { ...testUser, returnUrl: '/test' };
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
    const payload: UsersPageFilter = { ...testPageFilter, companyId: 1 };
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
      page_filter: testPageFilter,
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

describe('PasswordChange', () => {
  it('should create an action', () => {
    const payload: PasswordChange = {
      old_password: 'test',
      new_password: 'newTest',
    };
    const action = UserActions.passwordChange({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.PasswordChange,
      payload,
    });
  });
});

describe('PasswordChangeSuccess', () => {
  it('should create an action', () => {
    const action = UserActions.passwordChangeSuccess();

    expect({ ...action }).toEqual({
      type: UserActionTypes.PasswordChangeSuccess,
    });
  });
});

describe('PasswordChangeFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.passwordChangeFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.PasswordChangeFail,
      payload,
    });
  });
});

describe('ChangeStatus', () => {
  it('should create an action', () => {
    const action = UserActions.changeStatus({ payload: 1 });

    expect({ ...action }).toEqual({
      type: UserActionTypes.ChangeStatus,
      payload: 1,
    });
  });
});

describe('ChangeStatusSuccess', () => {
  it('should create an action', () => {
    const payload = testUser;
    const action = UserActions.changeStatusSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.ChangeStatusSuccess,
      payload: testUser,
    });
  });
});

describe('ChangeStatusFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.changeStatusFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.ChangeStatusFail,
      payload,
    });
  });
});

describe('DeleteUser', () => {
  it('should create an action', () => {
    const action = UserActions.deleteUser({ payload: testIdWithParams });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUser,
      payload: testIdWithParams,
    });
  });
});

describe('DeleteUserSuccess', () => {
  it('should create an action', () => {
    const payload = userWithLocalParams;
    const action = UserActions.deleteUserSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUserSuccess,
      payload: userWithLocalParams,
    });
  });
});

describe('DeleteUserFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.deleteUserFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUserFail,
      payload,
    });
  });
});

describe('DeleteUserHard', () => {
  it('should create an action', () => {
    const action = UserActions.deleteUserHard({ payload: testIdWithParams });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUserHard,
      payload: testIdWithParams,
    });
  });
});

describe('DeleteUserHardSuccess', () => {
  it('should create an action', () => {
    const payload = '/test';
    const action = UserActions.deleteUserHardSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUserHardSuccess,
      payload: '/test',
    });
  });
});

describe('DeleteUserHardFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.deleteUserHardFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.DeleteUserHardFail,
      payload,
    });
  });
});

describe('Restore', () => {
  it('should create an action', () => {
    const action = UserActions.restore({ payload: 1 });

    expect({ ...action }).toEqual({
      type: UserActionTypes.Restore,
      payload: 1,
    });
  });
});

describe('RestoreSuccess', () => {
  it('should create an action', () => {
    const payload = testUser;
    const action = UserActions.restoreSuccess({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.RestoreSuccess,
      payload: testUser,
    });
  });
});

describe('RestoreFail', () => {
  it('should create an action', () => {
    const payload: BaseError = testError;
    const action = UserActions.restoreFail({ payload });

    expect({ ...action }).toEqual({
      type: UserActionTypes.RestoreFail,
      payload,
    });
  });
});
