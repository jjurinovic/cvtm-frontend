import { createAction, props } from '@ngrx/store';

export enum AdminActionTypes {
  SetAdminTab = '[Admin] Set Admin Tab index',
  SetAdminCompanyTab = '[Admin] Set Admin Company Tab index',
}

export const setAdminTab = createAction(
  AdminActionTypes.SetAdminTab,
  props<{ payload: number }>()
);

export const setAdminCompanyTab = createAction(
  AdminActionTypes.SetAdminCompanyTab,
  props<{ payload: number }>()
);
