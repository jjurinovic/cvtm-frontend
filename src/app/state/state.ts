// src/app/state/index.ts
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as auth from './auth/auth.reducers';
import * as company from '../features/company/state/company.reducers';

export interface State {
  auth: auth.State;
  company: company.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: auth.reducer,
  company: company.reducer,
};
