import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { User } from 'src/app/features/users/models/user.model';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';
import * as UserActions from '../../features/users/state/users.actions';
import { Role } from 'src/app/features/users/enums/role.enum';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user!: User;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.store.select(selectCurrentUser).subscribe((data) => {
      this.user = data;

      if (this.user) {
        this.form = this.fb.group({
          first_name: [this.user.first_name, Validators.required],
          last_name: [this.user.last_name, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          address: this.fb.group({
            address1: [this.user.address?.address1, Validators.required],
            address2: [this.user.address?.address2],
            city: [this.user.address?.city, Validators.required],
            postcode: [this.user.address?.postcode, Validators.required],
            county: [this.user.address?.county],
            country: [this.user.address?.country, Validators.required],
          }),
        });
      }
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        UserActions.updateUser({
          ...this.form.value,
          id: this.user.id,
          company_id: this.user.company_id,
        })
      );
    }
  }

  getRole(): string {
    return Role[this.user?.role];
  }

  openDialog(): void {
    this.dialog.open(PasswordChangeDialogComponent);
  }
}
