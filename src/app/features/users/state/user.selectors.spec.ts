import { State } from './user.reducers';
import {
  selectAllUsers,
  selectError,
  selectIsLoading,
  selectPageUsers,
  selectSearchUsers,
  selectSizeUsers,
  selectSortFieldUsers,
  selectSortUsers,
  selectTotalUsers,
  selectUserData,
} from './user.selectors';

describe('User Selectors', () => {
  const state: State = {
    isLoading: false,
    error: 'test error',
    page: 1,
    size: 10,
    q: 'test',
    sort: 'asc',
    sortField: 'testField',
    total: 1,
    user: {
      first_name: 'test first name',
      last_name: 'test last name',
      company_id: 1,
      email: 'test@email.com',
      id: 999,
      role: 0,
    },
    users: [
      {
        first_name: 'test first name',
        last_name: 'test last name',
        company_id: 1,
        email: 'test@email.com',
        id: 999,
        role: 0,
      },
    ],
  };

  it('should selectAllUsers return users array', () => {
    expect(selectAllUsers.projector(state)).toBeDefined();
    expect(selectAllUsers.projector(state).length).toEqual(1);
    expect(selectAllUsers.projector(state)).toEqual([
      {
        first_name: 'test first name',
        last_name: 'test last name',
        company_id: 1,
        email: 'test@email.com',
        id: 999,
        role: 0,
      },
    ]);
  });

  it('should selectTotalUsers return total number of users', () => {
    expect(selectTotalUsers.projector(state)).toBeDefined();
    expect(selectTotalUsers.projector(state)).toEqual(1);
  });

  it('should selectPageUsers return page number', () => {
    expect(selectPageUsers.projector(state)).toBeDefined();
    expect(selectPageUsers.projector(state)).toEqual(1);
  });

  it('should selectSizeUsers return size, number of items per page', () => {
    expect(selectSizeUsers.projector(state)).toBeDefined();
    expect(selectSizeUsers.projector(state)).toEqual(10);
  });

  it('should selectSortUsers return sort direction', () => {
    expect(selectSortUsers.projector(state)).toBeDefined();
    expect(selectSortUsers.projector(state)).toEqual('asc');
  });

  it('should selectSortFieldUsers return sort field', () => {
    expect(selectSortFieldUsers.projector(state)).toBeDefined();
    expect(selectSortFieldUsers.projector(state)).toEqual('testField');
  });

  it('should selectSearchUsers return search query', () => {
    expect(selectSearchUsers.projector(state)).toBeDefined();
    expect(selectSearchUsers.projector(state)).toEqual('test');
  });

  it('should selectUserData return user', () => {
    expect(selectUserData.projector(state)).toBeDefined();
    expect(selectUserData.projector(state)).toEqual({
      first_name: 'test first name',
      last_name: 'test last name',
      company_id: 1,
      email: 'test@email.com',
      id: 999,
      role: 0,
    });
  });

  it('should selectError return error', () => {
    expect(selectError.projector(state)).toBeDefined();
    expect(selectError.projector(state)).toEqual('test error');
  });

  it('should selectIsLoading return false', () => {
    expect(selectIsLoading.projector(state)).toBeDefined();
    expect(selectIsLoading.projector(state)).toBeFalse();
  });
});
