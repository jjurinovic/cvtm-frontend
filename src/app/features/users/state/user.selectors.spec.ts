import { testPageFilter, testUser } from 'src/test-data/data';
import { State } from './user.reducers';
import {
  selectAllUsers,
  selectCurrentUser,
  selectError,
  selectIsLoading,
  selectUserData,
  selectUsersPageFilter,
} from './user.selectors';

describe('User Selectors', () => {
  const state: State = {
    isLoading: false,
    error: 'test error',
    pageFilter: testPageFilter,
    user: testUser,
    users: [testUser],
    currentUser: testUser,
  };

  it('should selectAllUsers return users array', () => {
    expect(selectAllUsers.projector(state)).toBeDefined();
    expect(selectAllUsers.projector(state).length).toEqual(1);
    expect(selectAllUsers.projector(state)).toEqual([testUser]);
  });

  it('should selectTotalUsers return total number of users', () => {
    expect(selectUsersPageFilter.projector(state)).toBeDefined();
    expect(selectUsersPageFilter.projector(state)).toEqual(testPageFilter);
  });

  it('should selectUserData return user', () => {
    expect(selectUserData.projector(state)).toBeDefined();
    expect(selectUserData.projector(state)).toEqual(testUser);
  });

  it('should selectError return error', () => {
    expect(selectError.projector(state)).toBeDefined();
    expect(selectError.projector(state)).toEqual('test error');
  });

  it('should selectIsLoading return false', () => {
    expect(selectIsLoading.projector(state)).toBeDefined();
    expect(selectIsLoading.projector(state)).toBeFalse();
  });

  it('should selectCurrentUser return loading state', () => {
    expect(selectCurrentUser.projector(state)).toBeDefined();
    expect(selectCurrentUser.projector(state)).toEqual(testUser);
  });
});
