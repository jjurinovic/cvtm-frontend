import { createAction, props } from '@ngrx/store';

export enum AdminActionTypes {
  SetTab = '[Admin] Set Tab index',
}

export const setTab = createAction(
  AdminActionTypes.SetTab,
  props<{ payload: number }>()
);
