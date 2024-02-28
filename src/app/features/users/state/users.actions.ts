import { createAction, props } from '@ngrx/store';

import { User, UserWithLocalParams } from '../models/user.model';
import { PageResponse } from 'src/app/shared/models/page-response.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { UsersPageFilter } from '../models/users-page-filter.model';
import { PasswordChange } from '../models/password-change.model';
import { IdWithParams } from 'src/app/shared/models/id-with-params.model';

export enum UserActionTypes {
  CreateUser = '[User] Create New User',
  CreateUserSuccess = '[User] Create New User Success',
  CreateUserFail = '[User] Create New User Fail',
  UpdateUser = '[User] Update User',
  UpdateUserSuccess = '[User] Update User Success',
  UpdateUserFail = '[User] Update User Fail',
  GetUserById = '[User] Get User by ID',
  GetUserByIdSuccess = '[User] Get User by ID Success',
  GetUserByIdFail = '[User] Get User by ID Fail',
  GetAllUsers = '[User] Get all Users',
  GetAllUsersSuccess = '[User] Get all Users Success',
  GetAllUsersFail = '[User] Get all Users Fail',
  ResetUserForm = '[User] Reset user form',
  PasswordChange = '[User] Password change',
  PasswordChangeSuccess = '[User] Password change Success',
  PasswordChangeFail = '[User] Password changeFail',
  ChangeStatus = '[User] Change status',
  ChangeStatusSuccess = '[User] Change status Success',
  ChangeStatusFail = '[User] Change status Fail',
  DeleteUser = '[User] Delete user',
  DeleteUserSuccess = '[User] Delete user Success',
  DeleteUserFail = '[User] Delete user Fail',
  DeleteUserHard = '[User] Delete user HARD',
  DeleteUserHardSuccess = '[User] Delete user HARD Success',
  DeleteUserHardFail = '[User] Delete user HARD Fail',
  Restore = '[User] Restore user',
  RestoreSuccess = '[User] Restore user Success',
  RestoreFail = '[User] Restore user Fail',
  CurrentUser = '[User] Current user',
  CurrentUserSuccess = '[User] Current user Success',
  CurrentUserFail = '[User] Current user Fail',
  RemoveCurrentUser = '[User] Remove current user',
}

export const createUser = createAction(
  UserActionTypes.CreateUser,
  props<{ payload: UserWithLocalParams }>()
);

export const createUserSuccess = createAction(
  UserActionTypes.CreateUserSuccess,
  props<{ payload: UserWithLocalParams }>()
);

export const createUserFail = createAction(
  UserActionTypes.CreateUserFail,
  props<{ payload: BaseError }>()
);

export const updateUser = createAction(
  UserActionTypes.UpdateUser,
  props<{ payload: UserWithLocalParams }>()
);

export const updateUserSuccess = createAction(
  UserActionTypes.UpdateUserSuccess,
  props<{ payload: UserWithLocalParams }>()
);

export const updateUserFail = createAction(
  UserActionTypes.UpdateUserFail,
  props<{ payload: any }>()
);

export const getUserById = createAction(
  UserActionTypes.GetUserById,
  props<{ payload: number }>()
);

export const getUserByIdSuccess = createAction(
  UserActionTypes.GetUserByIdSuccess,
  props<{ payload: User }>()
);

export const getUserByIdFail = createAction(
  UserActionTypes.GetUserByIdFail,
  props<{ payload: BaseError }>()
);

export const getAllUsers = createAction(
  UserActionTypes.GetAllUsers,
  props<{ payload: UsersPageFilter }>()
);

export const getAllUsersSuccess = createAction(
  UserActionTypes.GetAllUsersSuccess,
  props<{ payload: PageResponse<User> }>()
);

export const getAllUsersFail = createAction(
  UserActionTypes.GetAllUsersFail,
  props<{ payload: BaseError }>()
);

export const resetUserForm = createAction(UserActionTypes.ResetUserForm);

export const passwordChange = createAction(
  UserActionTypes.PasswordChange,
  props<{ payload: PasswordChange }>()
);

export const passwordChangeSuccess = createAction(
  UserActionTypes.PasswordChangeSuccess
);

export const passwordChangeFail = createAction(
  UserActionTypes.PasswordChangeFail,
  props<{ payload: BaseError }>()
);

export const changeStatus = createAction(
  UserActionTypes.ChangeStatus,
  props<{ payload: number }>()
);

export const changeStatusSuccess = createAction(
  UserActionTypes.ChangeStatusSuccess,
  props<{ payload: User }>()
);

export const changeStatusFail = createAction(
  UserActionTypes.ChangeStatusFail,
  props<{ payload: BaseError }>()
);

export const deleteUser = createAction(
  UserActionTypes.DeleteUser,
  props<{ payload: IdWithParams }>()
);

export const deleteUserSuccess = createAction(
  UserActionTypes.DeleteUserSuccess,
  props<{ payload: UserWithLocalParams }>()
);

export const deleteUserFail = createAction(
  UserActionTypes.DeleteUserFail,
  props<{ payload: BaseError }>()
);

export const deleteUserHard = createAction(
  UserActionTypes.DeleteUserHard,
  props<{ payload: IdWithParams }>()
);

export const deleteUserHardSuccess = createAction(
  UserActionTypes.DeleteUserHardSuccess,
  props<{ payload: string }>()
);

export const deleteUserHardFail = createAction(
  UserActionTypes.DeleteUserHardFail,
  props<{ payload: BaseError }>()
);

export const restore = createAction(
  UserActionTypes.Restore,
  props<{ payload: number }>()
);

export const restoreSuccess = createAction(
  UserActionTypes.RestoreSuccess,
  props<{ payload: User }>()
);

export const restoreFail = createAction(
  UserActionTypes.RestoreFail,
  props<{ payload: BaseError }>()
);

export const currentUser = createAction(UserActionTypes.CurrentUser);

export const currentUserSuccess = createAction(
  UserActionTypes.CurrentUserSuccess,
  props<{ payload: User }>()
);

export const currentUserFail = createAction(
  UserActionTypes.CurrentUserFail,
  props<{ payload: BaseError }>()
);

export const removeCurrentUser = createAction(
  UserActionTypes.RemoveCurrentUser
);
