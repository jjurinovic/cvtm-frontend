import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AuthActionTypes } from './auth/auth.actions';

// used for clear state on logout
export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === AuthActionTypes.Logout) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
