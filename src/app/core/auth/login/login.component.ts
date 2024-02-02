import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AuthActions from '../../../state/auth/auth.actions';
import {
  selectError,
  selectIsLoading,
} from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: FormGroup;
  public hide: boolean = true;
  public isLoading: boolean = false;
  public error: string = '';

  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get isLoading from store
    this.store
      .select(selectIsLoading)
      .subscribe((val: boolean) => (this.isLoading = val));

    // get error from store
    this.store
      .select(selectError)
      .subscribe((err: string) => (this.error = err));
  }

  public submit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        AuthActions.login({
          payload: this.form.value,
        })
      );
    }
  }
}
