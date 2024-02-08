import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Role } from 'src/app/features/users/enums/role.enum';
import * as UserActions from '../../../users/state/users.actions';
import { selectUserData } from 'src/app/features/users/state/user.selectors';
import { User } from 'src/app/features/users/models/user.model';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnDestroy {
  form: FormGroup;
  userId: number | null = null;
  companyId?: number;
  currentUser!: User;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      role: [Role.USER],
      inactive: [false],
      deleted: [false],
      address: this.fb.group({
        address1: [null, Validators.required],
        address2: [null],
        city: [null, Validators.required],
        postcode: [null, Validators.required],
        county: [null],
        country: [null, Validators.required],
      }),
    });

    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.companyId = params['companyId'];

      if (this.userId) {
        this.store.dispatch(UserActions.getUserById({ payload: this.userId }));
      }
    });

    this.store.select(selectUserData).subscribe((user) => {
      if (user) this.form.patchValue(user);

      if (user?.inactive || user?.deleted) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
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
              returnUrl: `/admin/company/${this.companyId}/edit`,
              myId: this.currentUser.id,
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
              returnUrl: `/admin/company/${this.companyId}/edit`,
            },
          })
        );
      }
    }
  }

  toggleStatus(): void {
    if (!this.form.get('deleted')?.value) {
      this.store.dispatch(
        UserActions.changeStatus({ payload: this.userId as number })
      );
    }
  }
}
