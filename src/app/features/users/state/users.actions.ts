import { createAction, props } from '@ngrx/store';

import { User } from '../models/user.model';
import { PageResponse } from 'src/app/shared/models/page-response';

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
}

export const createUser = createAction(
  UserActionTypes.CreateUser,
  props<{ payload: any }>()
);

export const createUserSuccess = createAction(
  UserActionTypes.CreateUserSuccess,
  props<{ payload: any }>()
);

export const createUserFail = createAction(
  UserActionTypes.CreateUserFail,
  props<{ payload: any }>()
);

export const updateUser = createAction(
  UserActionTypes.UpdateUser,
  props<{ payload: User }>()
);

export const updateUserSuccess = createAction(
  UserActionTypes.UpdateUserSuccess,
  props<{ payload: any }>()
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
  props<{ payload: any }>()
);

export const getAllUsers = createAction(
  UserActionTypes.GetAllUsers,
  props<{ payload: any }>()
);

export const getAllUsersSuccess = createAction(
  UserActionTypes.GetAllUsersSuccess,
  props<{ payload: PageResponse<User> }>()
);

export const getAllUsersFail = createAction(
  UserActionTypes.GetAllUsersFail,
  props<{ payload: any }>()
);
