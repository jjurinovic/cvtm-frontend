import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Role } from 'src/app/features/users/enums/role.enum';
import * as UserActions from '../../../users/state/users.actions';
import { selectUserData } from 'src/app/features/users/state/user.selectors';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  form: FormGroup;
  userId: number | null = null;
  companyId?: number;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null],
      role: [Role[3]],
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

      if (this.userId) {
        this.store.dispatch(UserActions.getUserById({ payload: this.userId }));
      }
    });

    this.store.select(selectUserData).subscribe((user) => {
      if (user) this.form.patchValue(user);
      this.companyId = user?.company_id;
    });
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.userId) {
        this.store.dispatch(
          UserActions.updateUser({
            ...this.form.value,
            id: this.userId,
            returnUrl: `/admin/company/${this.companyId}/edit`,
          })
        );
      } else {
        this.store.dispatch(
          UserActions.createUser({
            ...this.form.value,
            role: Role[this.form.value.role],
            returnUrl: `/admin/company/${this.companyId}/edit`,
          })
        );
      }
    }
  }
}
