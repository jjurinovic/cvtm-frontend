import { testUser } from 'src/test-data/data';
import {
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
} from './auth.selectors';

describe('Auth Selectors', () => {
  const state = {
    isLoggedIn: false,
    error: 'this is error',
    isLoading: false,
    user: testUser,
  };

  it('should selectIsLoggedIn return false', () => {
    expect(selectIsLoggedIn.projector(state)).toBeDefined();
    expect(selectIsLoggedIn.projector(state)).toBeFalse();
  });

  it('should selectError return valid error', () => {
    expect(selectError.projector(state)).toBeDefined();
    expect(selectError.projector(state)).toBe('this is error');
  });

  it('should selectIsLoading return loading state', () => {
    expect(selectIsLoading.projector(state)).toBeDefined();
    expect(selectIsLoading.projector(state)).toBeFalse();
  });
});
