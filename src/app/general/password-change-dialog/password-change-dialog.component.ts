import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngrx/store';

import { passwordValidator } from '../../shared/validators/password.validator';
import { passwordChange } from 'src/app/features/users/state/users.actions';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrl: './password-change-dialog.component.scss',
})
export class PasswordChangeDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.form = this.fb.group(
      {
        old_password: [null, Validators.required],
        new_password: [null, Validators.required],
        repeat_password: [null, Validators.required],
      },
      { validators: passwordValidator }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      this.store.dispatch(passwordChange(this.form.value));
    }
  }
}
