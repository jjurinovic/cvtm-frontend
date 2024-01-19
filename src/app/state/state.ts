// src/app/state/index.ts
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as auth from './auth/auth.reducers';

export interface State {
  auth: auth.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: auth.reducer,
};
