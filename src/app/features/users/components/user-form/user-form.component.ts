import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import { Role } from 'src/app/features/users/enums/role.enum';
import * as UserActions from '../../state/users.actions';
import {
  selectCurrentUser,
  selectUserData,
} from 'src/app/features/users/state/user.selectors';
import { User } from 'src/app/features/users/models/user.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { selectCompanyId } from 'src/app/features/company/state/company.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnDestroy {
  form: FormGroup;
  userId: number | null = null;
  companyId?: number;
  addressId?: number;
  currentUser!: User;

  rootRole: Role = Role.ROOT;

  private returnUrl: string = 'users';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [Role.USER],
      inactive: [false],
      deleted: [false],
    });

    this.route.params.subscribe((params) => {
      this.userId = params['id'];

      if (this.userId) {
        this.store.dispatch(UserActions.getUserById({ payload: this.userId }));
      }
    });

    this.store.select(selectUserData).subscribe((user) => {
      if (user) {
        this.form.patchValue(user);
        this.addressId = user.address?.id;
      }

      if (user?.inactive || user?.deleted) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user as User));

    this.store.select(selectCompanyId).subscribe((companyId) => {
      if (companyId) this.companyId = companyId;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.resetUserForm());
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.userId) {
        this.store.dispatch(
          UserActions.updateUser({
            payload: {
              ...this.form.value,
              id: this.userId,
              myId: this.currentUser.id,
              address: { ...this.form.value.address, id: this.addressId },
            },
          })
        );
      } else {
        this.store.dispatch(
          UserActions.createUser({
            payload: {
              ...this.form.value,
              role: this.form.value.role,
              company_id: this.companyId,
              returnUrl: this.returnUrl,
            },
          })
        );
      }
    }
  }

  openDialog(type: string): void {
    let title: string = '';
    let message: string = '';
    let action: any;

    if (type === 'restore') {
      title = 'Restore User';
      message = 'Are you sure you want to restore deleted user?';
      action = this.restore.bind(this);
    } else if (type === 'delete') {
      title = 'Delete User';
      message = 'Are you sure you want to delete user?';
      action = this.deleteUser.bind(this);
    } else if (type === 'deleteHard') {
      title = 'Delete User (NO UNDO)';
      message = 'Are you sure you want to delete user without undo?';
      action = this.deleteHard.bind(this);
    } else if (type === 'status') {
      title = this.form.get('inactive')?.value ? 'Activate' : 'Deactivate';
      message = `Are you sure you want to ${title} user?`;
      action = this.toggleStatus.bind(this);
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title,
        message,
        onYes: () => {
          action();
        },
      },
    });
  }

  toggleStatus(): void {
    if (!this.form.get('deleted')?.value) {
      this.store.dispatch(
        UserActions.changeStatus({ payload: this.userId as number })
      );
    }
  }

  deleteUser(): void {
    this.store.dispatch(
      UserActions.deleteUser({
        payload: {
          id: this.userId as number,
        },
      })
    );
  }

  restore(): void {
    this.store.dispatch(
      UserActions.restore({ payload: this.userId as number })
    );
  }

  deleteHard(): void {
    this.store.dispatch(
      UserActions.deleteUserHard({
        payload: {
          id: this.userId as number,
          returnUrl: this.returnUrl,
        },
      })
    );
  }
}
