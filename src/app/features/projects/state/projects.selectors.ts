import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './projects.reducers';

const selectCompany = createFeatureSelector<State>('projects');

export const selectProject = createSelector(
  selectCompany,
  (state) => state.project
);

export const selectProjects = createSelector(
  selectCompany,
  (state) => state.projects
);

export const selectProjectsPageFilter = createSelector(
  selectCompany,
  (state) => state.pageFilter
);
