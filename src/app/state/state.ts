// src/app/state/index.ts
import { ActionReducerMap } from '@ngrx/store';

import * as auth from './auth/auth.reducers';
import * as company from '../features/company/state/company.reducers';
import * as admin from '../features/admin/state/admin.reducers';
import * as user from '../features/users/state/user.reducers';
import * as timeTracking from '../features/time-tracking/state/time-tracking.reducers';
import * as project from '../features/projects/state/projects.reducers';

export interface State {
  auth: auth.State;
  company: company.State;
  admin: admin.State;
  user: user.State;
  timeTracking: timeTracking.State;
  projects: project.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: auth.reducer,
  company: company.reducer,
  admin: admin.reducer,
  user: user.reducer,
  timeTracking: timeTracking.reducer,
  projects: project.reducer,
};
