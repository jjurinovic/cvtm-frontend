import { createReducer, on } from '@ngrx/store';

import { PageFilter } from 'src/app/shared/models/page-filter.model';
import { Project } from '../models/project.model';
import * as ProjectsActions from './projects.actions';

export interface State {
  isLoading: boolean;
  error: string | null;
  pageFilter: PageFilter;
  project: Project | null;
  projects: Project[];
}

export const initialState: State = {
  isLoading: false,
  project: null,
  projects: [],
  error: null,
  pageFilter: {
    page: 1,
    size: 10,
    total: 0,
    q: null,
    sort: null,
    sort_field: null,
  },
};

export const reducer = createReducer(
  initialState,

  // CREATE PROJECT
  on(ProjectsActions.createProject, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.createProjectSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  })),
  on(ProjectsActions.createProjectFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // UPDATE PROJECT
  on(ProjectsActions.updateProject, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.updateProjectSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  })),
  on(ProjectsActions.updateProjectFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // GET PROJECT
  on(ProjectsActions.getProject, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.getProjectSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  })),
  on(ProjectsActions.getProjectFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // GET ALL PROJECTS
  on(ProjectsActions.getAllProjects, (state, { payload }) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.getAllProjectsSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    projects: payload.results,
    pageFilter: payload.page_filter,
  })),
  on(ProjectsActions.getAllProjectsFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // ASSIGN USERS
  on(ProjectsActions.assignUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.assignUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  })),
  on(ProjectsActions.assignUsersFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // REMOVE USERS
  on(ProjectsActions.removeUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.removeUsersSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    project: payload,
  })),
  on(ProjectsActions.removeUsersFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  })),

  // GET BY USER
  on(ProjectsActions.getByUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProjectsActions.getByUserSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    projects: payload,
  })),
  on(ProjectsActions.getByUserFail, (state, { payload }) => ({
    ...state,
    isLoading: false,
    error: payload.detail,
  }))
);
