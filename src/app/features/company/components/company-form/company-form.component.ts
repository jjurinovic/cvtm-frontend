import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import * as CompanyActions from '../../state/company.actions';
import { selectCurrentCompany } from 'src/app/features/company/state/company.selectors';
import { selectAdminCompanyTabIndex } from '../../../admin/state/admin.selectors';
import { setAdminCompanyTab } from '../../../admin/state/admin.actions';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnDestroy {
  form: FormGroup;
  companyId: number | null = null;
  addressId: number | null = null;
  selectedTabIndex: number = 0;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      vat: [null],
      inactive: [false],
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
      if (company) {
        this.form.patchValue(company);
        this.addressId = company.address.id;
      }

      // disable form depending on form status
      if (company?.inactive) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });

    this.store
      .select(selectAdminCompanyTabIndex)
      .subscribe((index) => (this.selectedTabIndex = index));
  }

  ngOnDestroy(): void {
    this.store.dispatch(CompanyActions.resetCompanyForm());
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.companyId) {
        this.store.dispatch(
          CompanyActions.updateCompany({
            ...this.form.value,
            id: this.companyId,
            address: { id: this.addressId, ...this.form.value.address },
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

  openDialog(type: string): void {
    let title: string = '';
    let message: string = '';
    let action: any;

    if (type === 'delete') {
      title = 'Delete Company';
      message = 'Are you sure you want to delete company?';
      action = this.deleteCompany.bind(this);
    } else if (type === 'status') {
      title = this.form.get('inactive')?.value ? 'Activate' : 'Deactivate';
      message = `Are you sure you want to ${title} company?`;
      action = this.toggleStatus.bind(this);
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title,
        message,
        onYes: () => {
          action();
        },
      },
    });
  }

  toggleStatus(): void {
    this.store.dispatch(
      CompanyActions.changeStatus({ payload: this.companyId as number })
    );
  }

  deleteCompany(): void {
    this.store.dispatch(
      CompanyActions.deleteCompany({
        payload: {
          id: this.companyId as number,
          returnUrl: '/admin',
        },
      })
    );
  }
}
