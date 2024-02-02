// src/app/state/index.ts
import { ActionReducerMap } from '@ngrx/store';

import * as auth from './auth/auth.reducers';
import * as company from '../features/company/state/company.reducers';
import * as admin from '../features/admin/state/admin.reducers';

export interface State {
  auth: auth.State;
  company: company.State;
  admin: admin.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: auth.reducer,
  company: company.reducer,
  admin: admin.reducer,
};
