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
      name: ['', Validators.required],
      vat: [''],
      address: this.fb.group({
        address1: ['', Validators.required],
        address2: [''],
        city: ['', Validators.required],
        postcode: ['', Validators.required],
        county: [''],
        country: ['', Validators.required],
      }),
    });
  }

  public submit(): void {
    this.store.dispatch(CompanyActions.createCompany(this.form.value));
  }
}
