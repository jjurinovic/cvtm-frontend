import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { User, UserWithReturnUrl } from '../models/user.model';
import { BaseError } from 'src/app/shared/models/error';
import { State, initialState } from './user.reducers';
import { UserEffects } from './user.effects';
import { UsersService } from '../services/users.service';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';
import { PageResponse } from 'src/app/shared/models/page-response';
import { UsersRequest } from '../models/users-request';
import {
  getUserById,
  getUserByIdFail,
  updateUserSuccess,
} from './users.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  UserActionTypes,
  createUser,
  getAllUsers,
  updateUser,
} from './users.actions';

const testUser: User = {
  first_name: 'test user',
  last_name: 'test user',
  company_id: 1,
  email: 'test@email.com',
  id: 999,
  role: 0,
};

const userWithReturnUrl: UserWithReturnUrl = {
  ...testUser,
  returnUrl: '/test',
};

const testUsersRequest: UsersRequest = {
  companyId: 999,
  page: 1,
  size: 2,
  sort: 'asc',
  sortField: 'name',
  q: 'test',
};

const testPageResponse: PageResponse<User> = {
  results: [testUser],
  size: 10,
  page: 1,
  total: 1,
  sort: 'asc',
  sort_field: 'name',
  q: 'test',
};

const testError: BaseError = { detail: 'test error' };

const testInitialState: State = { ...initialState };

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let userServiceSpy: any;
  let store: MockStore;
  let router: Router;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UsersService', [
      'getCurrentUser',
      'getAll',
      'createUser',
      'updateUser',
      'getUserById',
    ]);

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule],
      providers: [
        provideMockActions(() => actions$),
        UserEffects,
        {
          provide: UsersService,
          useValue: userServiceSpy,
        },
        provideMockStore({
          initialState: testInitialState,
          selectors: [{ selector: selectCurrentUser, value: null }],
        }),
      ],
    });
    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigateByUrl');
  });

  it('should call getAll$ and return response', (done) => {
    userServiceSpy.getAll.and.returnValue(of(testPageResponse));

    const payload: UsersRequest = testUsersRequest;

    actions$ = of(getAllUsers({ payload }));
    effects.getAll$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.GetAllUsersSuccess,
        payload: testPageResponse,
      });
      done();
    });
  });

  it('should call getAll$ and return error', (done) => {
    userServiceSpy.getAll.and.throwError(testError);

    const payload: UsersRequest = testUsersRequest;

    actions$ = of(getAllUsers({ payload }));
    effects.getAll$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call createUser$ and return response', (done) => {
    userServiceSpy.createUser.and.returnValue(of(userWithReturnUrl));

    const payload: UserWithReturnUrl = userWithReturnUrl;

    actions$ = of(createUser({ payload }));
    effects.createUser$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.CreateUserSuccess,
        payload: userWithReturnUrl,
      });
      done();
    });
  });

  it('should call createUser$ and return error', (done) => {
    userServiceSpy.createUser.and.throwError(testError);

    const payload: UserWithReturnUrl = userWithReturnUrl;

    actions$ = of(createUser({ payload }));
    effects.createUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call updateUser$ and return response', (done) => {
    userServiceSpy.updateUser.and.returnValue(of(userWithReturnUrl));

    const payload: UserWithReturnUrl = userWithReturnUrl;

    actions$ = of(updateUser({ payload }));
    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.UpdateUserSuccess,
        payload: userWithReturnUrl,
      });
      done();
    });
  });

  it('should call updateUser$ and return error', (done) => {
    userServiceSpy.updateUser.and.throwError(testError);

    const payload: UserWithReturnUrl = userWithReturnUrl;

    actions$ = of(updateUser({ payload }));
    effects.updateUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call updateUserSuccess$ and return call snackbar and navigateByUrl', (done) => {
    const payload: UserWithReturnUrl = userWithReturnUrl;
    actions$ = of(updateUserSuccess({ payload }));

    effects.updateUserSuccess$.subscribe(() => done());

    expect(router.navigateByUrl).toHaveBeenCalledWith(payload.returnUrl);
  });

  it('should call getUserById$ and return response', (done) => {
    userServiceSpy.getUserById.and.returnValue(of(testUser));

    const payload: number = 1;

    actions$ = of(getUserById({ payload }));
    effects.getUserById$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.GetUserByIdSuccess,
        payload: testUser,
      });
      done();
    });
  });

  it('should call getUserById$ and return error', (done) => {
    userServiceSpy.getUserById.and.throwError(testError);

    const payload: number = 1;

    actions$ = of(getUserById({ payload }));
    effects.getUserById$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call getUserByIdFail$  and navigateByUrl', (done) => {
    const payload: BaseError = testError;
    actions$ = of(getUserByIdFail({ payload }));

    effects.getUserByIdFail$.subscribe(() => done());

    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });
});
