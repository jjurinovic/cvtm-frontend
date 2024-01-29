import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as CompanyActions from '../../../company/state/company.actions';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrl: './company-create.component.scss',
})
export class CompanyCreateComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      vat: [null],
      address: this.fb.group({
        address1: [null, Validators.required],
        address2: [null],
        city: [null, Validators.required],
        postcode: [null, Validators.required],
        county: [null],
        country: [null, Validators.required],
      }),
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.store.dispatch(CompanyActions.createCompany(this.form.value));
    }
  }
}
