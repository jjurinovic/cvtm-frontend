import * as fromReducer from './auth.reducers';
import * as AuthActions from './auth.actions';
import { testUser } from 'src/test-data/data';

describe('Auth reducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.reducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('login action', () => {
    it('should return the new state', () => {
      const { initialState } = fromReducer;

      const newState = { ...initialState, isLoading: true };
      const action = AuthActions.login({
        payload: { username: 'test', password: 'test' },
      });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toEqual(initialState);
    });
  });

  describe('loginSuccess action', () => {
    it('should return the new state with user', () => {
      const { initialState } = fromReducer;

      const newState: fromReducer.State = {
        ...initialState,
        isLoggedIn: true,
      };

      const action = AuthActions.loginSuccess({
        payload: {
          access_token: 'token',
          user: testUser,
        },
      });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toEqual(initialState);
    });
  });

  describe('loginFailure action', () => {
    it('should return the new state with error', () => {
      const { initialState } = fromReducer;

      const newState: fromReducer.State = {
        ...initialState,
        error: 'error',
      };

      const action = AuthActions.loginFailure({
        payload: {
          detail: 'error',
        },
      });
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(newState);
      expect(state).not.toEqual(initialState);
    });
  });

  describe('logout action', () => {
    it('should return initial state', () => {
      const { initialState } = fromReducer;

      const action = AuthActions.logout({});
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });
});
