import { createAction, props } from '@ngrx/store';

import { Project } from '../models/project.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { ProjectPageFilter } from '../models/project-page-filter.model';
import { ProjectUsers } from '../models/project-users.model';
import { PageResponse } from 'src/app/shared/models/page-response.model';

export enum ProjectActionTypes {
  CreateProject = '[Project] Create project',
  CreateProjectSuccess = '[Project] Create project Success',
  CreateProjectFail = '[Project] Create project Fail',
  UpdateProject = '[Project] Update project',
  UpdateProjectSuccess = '[Project] Update project Success',
  UpdateProjectFail = '[Project] Update project Fail',
  GetProject = '[Project] Get project',
  GetProjectSuccess = '[Project] Get project Success',
  GetProjectFail = '[Project] Get project Fail',
  GetAllProjects = '[Project] Get all projects',
  GetAllProjectsSuccess = '[Project] Get all projects Success',
  GetAllProjectsFail = '[Project] Get all projects Fail',
  AssignUsers = '[Project] Assign users',
  AssignUsersSuccess = '[Project] Assign users Success',
  AssignUsersFail = '[Project] Assign users Fail',
  RemoveUsers = '[Project] Remove users',
  RemoveUsersSuccess = '[Project] Remove users Success',
  RemoveUsersFail = '[Project] Remove users Fail',
  GetByUser = '[Project] Get by user',
  GetByUserSuccess = '[Project] Get by user Success',
  GetByUserFail = '[Project] Get by user Fail',
}

// CREATE PROJECT
export const createProject = createAction(
  ProjectActionTypes.CreateProject,
  props<{ payload: Project }>()
);

export const createProjectSuccess = createAction(
  ProjectActionTypes.CreateProjectSuccess,
  props<{ payload: Project }>()
);

export const createProjectFail = createAction(
  ProjectActionTypes.CreateProjectFail,
  props<{ payload: BaseError }>()
);

// UPDATE PROJECT
export const updateProject = createAction(
  ProjectActionTypes.UpdateProject,
  props<{ payload: Project }>()
);

export const updateProjectSuccess = createAction(
  ProjectActionTypes.UpdateProjectSuccess,
  props<{ payload: Project }>()
);

export const updateProjectFail = createAction(
  ProjectActionTypes.UpdateProjectFail,
  props<{ payload: BaseError }>()
);

// GET PROJECT
export const getProject = createAction(
  ProjectActionTypes.GetProject,
  props<{ payload: number }>()
);

export const getProjectSuccess = createAction(
  ProjectActionTypes.GetProjectSuccess,
  props<{ payload: Project }>()
);

export const getProjectFail = createAction(
  ProjectActionTypes.GetProjectFail,
  props<{ payload: BaseError }>()
);

// GET ALL PROJECTS
export const getAllProjects = createAction(
  ProjectActionTypes.GetAllProjects,
  props<{ payload: ProjectPageFilter }>()
);

export const getAllProjectsSuccess = createAction(
  ProjectActionTypes.GetAllProjectsSuccess,
  props<{ payload: PageResponse<Project> }>()
);

export const getAllProjectsFail = createAction(
  ProjectActionTypes.GetAllProjectsFail,
  props<{ payload: BaseError }>()
);

// ASSIGN USERS TO PROJECT
export const assignUsers = createAction(
  ProjectActionTypes.AssignUsers,
  props<{ payload: ProjectUsers }>()
);

export const assignUsersSuccess = createAction(
  ProjectActionTypes.AssignUsersSuccess,
  props<{ payload: Project }>()
);

export const assignUsersFail = createAction(
  ProjectActionTypes.AssignUsersFail,
  props<{ payload: BaseError }>()
);

// REMOVE USERS TO PROJECT
export const removeUsers = createAction(
  ProjectActionTypes.RemoveUsers,
  props<{ payload: ProjectUsers }>()
);

export const removeUsersSuccess = createAction(
  ProjectActionTypes.RemoveUsersSuccess,
  props<{ payload: Project }>()
);

export const removeUsersFail = createAction(
  ProjectActionTypes.RemoveUsersFail,
  props<{ payload: BaseError }>()
);

// GET PROJECT BY USER
export const getByUser = createAction(
  ProjectActionTypes.GetByUser,
  props<{ payload: number }>()
);

export const getByUserSuccess = createAction(
  ProjectActionTypes.GetByUserSuccess,
  props<{ payload: Project[] }>()
);

export const getByUserFail = createAction(
  ProjectActionTypes.GetByUserFail,
  props<{ payload: BaseError }>()
);
