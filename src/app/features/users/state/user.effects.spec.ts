import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { UserWithLocalParams } from '../models/user.model';
import { BaseError } from 'src/app/shared/models/error.model';
import { UserEffects } from './user.effects';
import { UsersService } from '../services/users.service';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';
import * as UserActions from './users.actions';
import { UserActionTypes } from './users.actions';
import { PasswordChange } from '../models/password-change.model';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthActionTypes } from 'src/app/state/auth/auth.actions';
import { initialState } from './user.reducers';
import {
  passChangeObj,
  testError,
  testIdWithParams,
  testPageResponse,
  testUser,
  testUsersRequest,
  userWithLocalParams,
} from 'src/test-data/data';
import { UsersPageFilter } from '../models/users-page-filter.model';
import { testPageFilter } from '../../../../test-data/data';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let userServiceSpy: any;
  let store: MockStore;
  let router: Router;
  let snackService: SnackbarService;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UsersService', [
      'getCurrentUser',
      'getAll',
      'createUser',
      'updateUser',
      'getUserById',
      'changePassword',
      'statusChange',
      'restore',
      'deleteUserSoft',
      'deleteUser',
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
          initialState: initialState,
          selectors: [{ selector: selectCurrentUser, value: null }],
        }),
      ],
    });
    effects = TestBed.inject(UserEffects);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    snackService = TestBed.inject(SnackbarService);
    spyOn(store, 'select').and.callThrough();
    spyOn(router, 'navigateByUrl');
    spyOn(snackService, 'success').and.callThrough();
  });

  it('should call getAll$ and return response', (done) => {
    userServiceSpy.getAll.and.returnValue(of(testPageResponse));

    const payload: UsersPageFilter = { ...testPageFilter, companyId: 1 };

    actions$ = of(UserActions.getAllUsers({ payload }));
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

    const payload: UsersPageFilter = { ...testPageFilter, companyId: 1 };

    actions$ = of(UserActions.getAllUsers({ payload }));
    effects.getAll$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call createUser$ and return response', (done) => {
    userServiceSpy.createUser.and.returnValue(of(userWithLocalParams));

    const payload: UserWithLocalParams = userWithLocalParams;

    actions$ = of(UserActions.createUser({ payload }));
    effects.createUser$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.CreateUserSuccess,
        payload: userWithLocalParams,
      });
      done();
    });
  });

  it('should call createUser$ and return error', (done) => {
    userServiceSpy.createUser.and.throwError(testError);

    const payload: UserWithLocalParams = userWithLocalParams;

    actions$ = of(UserActions.createUser({ payload }));
    effects.createUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call updateUser$ and return response', (done) => {
    userServiceSpy.updateUser.and.returnValue(of(userWithLocalParams));

    const payload: UserWithLocalParams = userWithLocalParams;

    actions$ = of(UserActions.updateUser({ payload }));
    effects.updateUser$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.UpdateUserSuccess,
        payload: userWithLocalParams,
      });
      done();
    });
  });

  it('should call updateUser$ and return error', (done) => {
    userServiceSpy.updateUser.and.throwError(testError);

    const payload: UserWithLocalParams = userWithLocalParams;

    actions$ = of(UserActions.updateUser({ payload }));
    effects.updateUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call updateUserSuccess$, and user id is not same as myId, and call snackbar and navigateByUrl and removeUser and currentUser', (done) => {
    const payload: UserWithLocalParams = { ...userWithLocalParams, id: 1 };
    actions$ = of(UserActions.updateUserSuccess({ payload }));
    let counter = 0;
    const actions: Array<
      AuthActionTypes.CurrentUser | AuthActionTypes.RemoveCurrentUser
    > = [AuthActionTypes.RemoveCurrentUser, AuthActionTypes.CurrentUser];

    effects.updateUserSuccess$.subscribe({
      next: (action) => {
        expect(action).toEqual({ type: actions[counter] });
        counter++;

        expect(snackService.success).toHaveBeenCalledWith(
          'User successfully updated!',
          10000
        );

        expect(router.navigateByUrl).toHaveBeenCalledWith(
          payload.returnUrl as string
        );
      },
      complete: () => done(),
    });
  });

  it('should call updateUserSuccess$, and user id is same as myId, and call snackbar and navigateByUrl', (done) => {
    const payload: UserWithLocalParams = { ...userWithLocalParams, id: 1 };
    actions$ = of(UserActions.updateUserSuccess({ payload }));

    effects.updateUserSuccess$.subscribe({
      complete: () => {
        expect(snackService.success).toHaveBeenCalledWith(
          'User successfully updated!',
          10000
        );

        expect(router.navigateByUrl).toHaveBeenCalledWith(
          payload.returnUrl as string
        );

        done();
      },
    });
  });

  it('should call getUserById$ and return response', (done) => {
    userServiceSpy.getUserById.and.returnValue(of(testUser));

    const payload: number = 1;

    actions$ = of(UserActions.getUserById({ payload }));
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

    actions$ = of(UserActions.getUserById({ payload }));
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
    actions$ = of(UserActions.getUserByIdFail({ payload }));

    effects.getUserByIdFail$.subscribe(() => done());

    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('should call passwordChange$ and return response', (done) => {
    userServiceSpy.changePassword.and.returnValue(of(passChangeObj));

    const payload: PasswordChange = passChangeObj;

    actions$ = of(UserActions.passwordChange({ payload }));
    effects.passwordChange$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.PasswordChangeSuccess,
      });
      done();
    });
  });

  it('should call passwordChange$ and return error', (done) => {
    userServiceSpy.changePassword.and.throwError(testError);

    const payload: PasswordChange = passChangeObj;

    actions$ = of(UserActions.passwordChange({ payload }));
    effects.passwordChange$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call passwordChangeSuccess$ and return response', (done) => {
    actions$ = of(UserActions.passwordChangeSuccess());
    effects.passwordChangeSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
  });

  /**
   * Change status
   */

  it('should call changeStatus$ and return response', (done) => {
    userServiceSpy.statusChange.and.returnValue(of(testUser));

    const payload = 999;

    actions$ = of(UserActions.changeStatus({ payload }));
    effects.changeStatus$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.ChangeStatusSuccess,
        payload: testUser,
      });
      done();
    });
  });

  it('should call changeStatus$ and return error', (done) => {
    userServiceSpy.statusChange.and.throwError(testError);

    const payload = 999;

    actions$ = of(UserActions.changeStatus({ payload }));
    effects.changeStatus$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call changeStatusSuccess$ and return response', (done) => {
    actions$ = of(UserActions.changeStatusSuccess({ payload: testUser }));
    effects.changeStatusSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
  });

  /**
   * Delete user
   */
  it('should call deleteUser$ and return response', (done) => {
    userServiceSpy.deleteUserSoft.and.returnValue(of(userWithLocalParams));

    const payload = testIdWithParams;

    actions$ = of(UserActions.deleteUser({ payload }));
    effects.deleteUser$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.DeleteUserSuccess,
        payload: userWithLocalParams,
      });
      done();
    });
  });

  it('should call deleteUser$ and return error', (done) => {
    userServiceSpy.deleteUserSoft.and.throwError(testError);

    const payload = testIdWithParams;

    actions$ = of(UserActions.deleteUser({ payload }));
    effects.deleteUser$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call deleteUserSuccess$ and return response', (done) => {
    actions$ = of(
      UserActions.deleteUserSuccess({ payload: userWithLocalParams })
    );
    effects.deleteUserSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/test');
  });

  /**
   * Restore user
   */

  it('should call restore$ and return response', (done) => {
    userServiceSpy.restore.and.returnValue(of(testUser));

    const payload = 999;

    actions$ = of(UserActions.restore({ payload }));
    effects.restore$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.RestoreSuccess,
        payload: testUser,
      });
      done();
    });
  });

  it('should call restore$ and return error', (done) => {
    userServiceSpy.restore.and.throwError(testError);

    const payload = 999;

    actions$ = of(UserActions.restore({ payload }));
    effects.restore$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call restoreSuccess$ and return response', (done) => {
    actions$ = of(UserActions.restoreSuccess({ payload: testUser }));
    effects.restoreSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
  });

  /**
   * Delete user hard
   */
  it('should call deleteUserHard$ and return response', (done) => {
    userServiceSpy.deleteUser.and.returnValue(of(userWithLocalParams));

    const payload = testIdWithParams;

    actions$ = of(UserActions.deleteUserHard({ payload }));
    effects.deleteUserHard$.subscribe((action) => {
      expect(action).toEqual({
        type: UserActionTypes.DeleteUserHardSuccess,
        payload: userWithLocalParams.returnUrl,
      });
      done();
    });
  });

  it('should call deleteUserHard$ and return error', (done) => {
    userServiceSpy.deleteUser.and.throwError(testError);

    const payload = testIdWithParams;

    actions$ = of(UserActions.deleteUserHard({ payload }));
    effects.deleteUserHard$.subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(testError);
        done();
      },
    });
  });

  it('should call deleteUserHardSuccess$ and return response', (done) => {
    actions$ = of(
      UserActions.deleteUserHardSuccess({
        payload: userWithLocalParams.returnUrl as string,
      })
    );
    effects.deleteUserHardSuccess$.subscribe(() => done());

    expect(snackService.success).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/test');
  });
});
