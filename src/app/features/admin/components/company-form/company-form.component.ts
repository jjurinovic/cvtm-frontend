import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as CompanyActions from '../../../company/state/company.actions';
import { selectCurrentCompany } from 'src/app/features/company/state/company.selectors';
import { selectAdminCompanyTabIndex } from '../../state/admin.selectors';
import { setAdminCompanyTab } from '../../state/admin.actions';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent {
  form: FormGroup;
  companyId: number | null = null;
  selectedTabIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {
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

    this.route.params.subscribe((params) => {
      this.companyId = params['id'];

      if (this.companyId) {
        this.store.dispatch(
          CompanyActions.getCompanyById({ payload: this.companyId })
        );
      }
    });

    this.store.select(selectCurrentCompany).subscribe((company) => {
      if (company) this.form.patchValue(company);
    });

    this.store
      .select(selectAdminCompanyTabIndex)
      .subscribe((index) => (this.selectedTabIndex = index));
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.companyId) {
        this.store.dispatch(
          CompanyActions.updateCompany({
            ...this.form.value,
            id: this.companyId,
          })
        );
      } else {
        this.store.dispatch(CompanyActions.createCompany(this.form.value));
      }
    }
  }

  public changeTab(index: number): void {
    this.selectedTabIndex = index;
    this.store.dispatch(setAdminCompanyTab({ payload: this.selectedTabIndex }));
  }
}
