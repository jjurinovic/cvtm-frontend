import {
  selectCurrentUser,
  selectError,
  selectIsLoading,
  selectIsLoggedIn,
} from './auth.selectors';

describe('Auth Selectors', () => {
  const state = {
    isLoggedIn: false,
    error: 'this is error',
    isLoading: false,
    user: {
      name: 'test user',
      company_id: 1,
      email: 'test@email.com',
      id: 999,
      role: 0,
    },
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

  it('should selectCurrentUser return loading state', () => {
    expect(selectCurrentUser.projector(state)).toBeDefined();
    expect(selectCurrentUser.projector(state)).toEqual({
      name: 'test user',
      company_id: 1,
      email: 'test@email.com',
      id: 999,
      role: 0,
    });
  });
});
