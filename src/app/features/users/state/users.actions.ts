import { createAction, props } from '@ngrx/store';

import { User, UserWithReturnUrl } from '../models/user.model';
import { PageResponse } from 'src/app/shared/models/page-response';
import { BaseError } from 'src/app/shared/models/error';
import { UsersRequest } from '../models/users-request';

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
}

export const createUser = createAction(
  UserActionTypes.CreateUser,
  props<{ payload: UserWithReturnUrl }>()
);

export const createUserSuccess = createAction(
  UserActionTypes.CreateUserSuccess,
  props<{ payload: UserWithReturnUrl }>()
);

export const createUserFail = createAction(
  UserActionTypes.CreateUserFail,
  props<{ payload: BaseError }>()
);

export const updateUser = createAction(
  UserActionTypes.UpdateUser,
  props<{ payload: UserWithReturnUrl }>()
);

export const updateUserSuccess = createAction(
  UserActionTypes.UpdateUserSuccess,
  props<{ payload: UserWithReturnUrl }>()
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
  props<{ payload: UsersRequest }>()
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
