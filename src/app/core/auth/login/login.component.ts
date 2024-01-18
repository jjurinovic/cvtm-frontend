import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../state/auth/auth.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: FormGroup;
  public hide: boolean = true;

  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
