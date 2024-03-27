import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/features/users/models/user.model';
import * as UserActions from '../../features/users/state/users.actions';
import { Role } from 'src/app/features/users/enums/role.enum';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';
import { selectCurrentUser } from 'src/app/features/users/state/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user!: User;
  form: FormGroup = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
  });
  currentUser!: User;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.store.select(selectCurrentUser).subscribe((data) => {
      this.user = data as User;
      if (this.user) {
        this.form.patchValue(this.user);
        this.form.get('address')?.patchValue(this.user.address);
      }
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        UserActions.updateUser({
          payload: {
            ...this.form.value,
            id: this.user.id,
            company_id: this.user.company_id,
            myId: this.user.id,
          },
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
