import { createReducer, on } from '@ngrx/store';

import * as AdminActions from './admin.actions';

export interface State {
  adminTabIndex: number;
}

export const initialState: State = {
  adminTabIndex: 0,
};

export const reducer = createReducer(
  initialState,
  on(AdminActions.setTab, (state, { payload }) => ({
    ...state,
    adminTabIndex: payload,
  }))
);
