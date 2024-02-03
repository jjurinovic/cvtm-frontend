import { createReducer, on } from '@ngrx/store';

import * as AdminActions from './admin.actions';

export interface State {
  adminTabIndex: number;
  companyTabIndex: number;
}

export const initialState: State = {
  adminTabIndex: 0,
  companyTabIndex: 0,
};

export const reducer = createReducer(
  initialState,
  on(AdminActions.setAdminTab, (state, { payload }) => ({
    ...state,
    adminTabIndex: payload,
  })),
  on(AdminActions.setAdminCompanyTab, (state, { payload }) => ({
    ...state,
    companyTabIndex: payload,
  }))
);
