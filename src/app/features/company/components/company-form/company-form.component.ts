import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  inject,
  numberAttribute,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import * as CompanyActions from '../../state/company.actions';
import { selectCurrentCompany } from 'src/app/features/company/state/company.selectors';
import { selectAdminCompanyTabIndex } from '../../../admin/state/admin.selectors';
import { setAdminCompanyTab } from '../../../admin/state/admin.actions';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent {
  @Input({ transform: numberAttribute, alias: 'id' }) companyId?: number;
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private _auth = inject(AuthService);

  form: FormGroup = this.fb.group({
    name: [null, Validators.required],
    vat: [null],
    inactive: [false],
  });
  addressId: number | null = null;
  selectedTabIndex: number = 0;

  ngOnInit() {
    console.log(this.companyId);
    // if root get id from path id
    if (this._auth.getRole() === Role.ROOT) {
      if (this.companyId) {
        this.store.dispatch(
          CompanyActions.getCompanyById({ payload: this.companyId })
        );
      }
    } else {
      this.store.dispatch(CompanyActions.getCompanyById({}));
    }

    this.store
      .select(selectAdminCompanyTabIndex)
      .subscribe((index) => (this.selectedTabIndex = index));
  }

  ngOnDestroy(): void {
    this.store.dispatch(CompanyActions.resetCompanyForm());
  }

  ngAfterViewInit(): void {
    this.store.select(selectCurrentCompany).subscribe((company) => {
      if (company) {
        this.form.patchValue(company);
        this.form.get('address')?.patchValue(company.address);
        this.addressId = company.address.id;
      }

      // disable form depending on form status
      if (company?.inactive) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
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
