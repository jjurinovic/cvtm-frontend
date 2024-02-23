import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as AuthActions from '../../../state/auth/auth.actions';
import {
  selectError,
  selectIsLoading,
} from 'src/app/state/auth/auth.selectors';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('logoAnimate', [
      state(
        'hasPadding',
        style({
          paddingBottom: '200px',
          opacity: 0,
        })
      ),
      state(
        'noPadding',
        style({
          paddingBottom: 0,
          opacity: 1,
        })
      ),
      transition('hasPadding => noPadding', [animate('.5s')]),
      transition('noPadding => hasPadding', [animate('0.5s')]),
    ]),
  ],
})
export class LoginComponent implements AfterViewInit {
  public form: FormGroup;
  public hide: boolean = true;
  public isLoading: boolean = false;
  public error: string = '';
  public animationDone: boolean;

  constructor(private store: Store, private fb: FormBuilder) {
    this.animationDone = true;

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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animationDone = false;
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
