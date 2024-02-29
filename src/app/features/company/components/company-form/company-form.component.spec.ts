import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { CompanyFormComponent } from './company-form.component';
import { UserListComponent } from '../../../users/components/user-list/user-list.component';
import { testCompany } from 'src/test-data/data';
import { initialState } from '../../state/company.reducers';
import { selectCurrentCompany } from 'src/app/features/company/state/company.selectors';
import {
  changeStatus,
  deleteCompany,
} from 'src/app/features/company/state/company.actions';
import { setAdminCompanyTab } from '../../../admin/state/admin.actions';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let store: MockStore;
  let dialog: MatDialog;

  const requiredFields = ['name', 'address1', 'city', 'postcode', 'country'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyFormComponent, UserListComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        RouterTestingModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCurrentCompany,
              value: null,
            },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.callThrough();
    fixture = TestBed.createComponent(CompanyFormComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tab groups', () => {
    const tabGroup = fixture.debugElement.query(By.directive(MatTabGroup));
    expect(tabGroup).toBeTruthy();
  });

  it('should render form', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should call store select', () => {
    expect(store.select).toHaveBeenCalled();
  });

  it('should have empty form on start', () => {
    expect(component.form.value).toEqual({
      name: null,
      vat: null,
      inactive: false,
      address: {
        address1: null,
        address2: null,
        city: null,
        postcode: null,
        county: null,
        country: null,
      },
    });
  });

  it('should call submit() and not dispatch on form submit on empty form', () => {
    const submitSpy = spyOn(component, 'submit').and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const btn = fixture.debugElement.query(By.css('#company-submit'));

    btn.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should call submit() and dispatch on form submit on not empty form', () => {
    const submitSpy = spyOn(component, 'submit').and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.form.setValue(testCompany);
    const btn = fixture.debugElement.query(By.css('#company-submit'));

    btn.nativeElement.click();
    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should have invalid form if no data in inputs', () => {
    const btn = fixture.debugElement.query(By.css('button'));

    btn.nativeElement.click();

    expect(component.form.valid).toBeFalsy();
  });

  it('should have valid form if with form data', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    component.form.setValue(testCompany);

    btn.nativeElement.click();

    expect(component.form.valid).toBeTruthy();
  });

  it('should mark fields as required', () => {
    requiredFields.forEach((id) => {
      const input = fixture.debugElement.query(By.css(`#${id}`));

      const hasRequiredAttr =
        Object.keys(input.attributes).indexOf('required') > -1;
      expect(hasRequiredAttr).toBeTrue();
    });
  });

  it('should have disabled form, disabled save btn and error message when company is inactive', () => {
    store.overrideSelector(selectCurrentCompany, {
      ...testCompany,
      inactive: true,
    });
    store.refreshState();
    fixture.detectChanges();

    expect(component.form.disabled).toBeTrue();

    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.disabled).toBeTrue();

    const errorMsg = fixture.debugElement.query(By.css('#error-msg'));
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.nativeElement.textContent).toEqual('Company is inactive');
    store.resetSelectors();
  });

  it('should Activate/Deactivate button open confirm dialog', () => {
    const openDialogSpy = spyOn(component, 'openDialog').and.callThrough();
    const dialogOpenSpy = spyOn(dialog, 'open').and.callThrough();
    const btn = fixture.debugElement.query(By.css('#company-toggle-status'));
    btn.nativeElement.click();

    expect(openDialogSpy).toHaveBeenCalledWith('status');
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should Delete button open confirm dialog', () => {
    const openDialogSpy = spyOn(component, 'openDialog').and.callThrough();
    const dialogOpenSpy = spyOn(dialog, 'open').and.callThrough();
    const btn = fixture.debugElement.query(By.css('#company-delete'));
    btn.nativeElement.click();

    expect(openDialogSpy).toHaveBeenCalledWith('delete');
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should show only save button if no companyId', () => {
    component.companyId = null;
    fixture.detectChanges();

    const saveBtn = fixture.debugElement.query(By.css('#company-submit'));
    const toggleBtn = fixture.debugElement.query(
      By.css('#company-toggle-status')
    );
    const deleteBtn = fixture.debugElement.query(By.css('#company-delete'));

    expect(saveBtn).toBeTruthy();
    expect(toggleBtn).toBeFalsy();
    expect(toggleBtn).toBeFalsy();
  });

  it('should toggleStatus() dispatch action', () => {
    const toggleStatusSpy = spyOn(component, 'toggleStatus').and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.toggleStatus();

    expect(toggleStatusSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      changeStatus({ payload: component.companyId as number })
    );
  });

  it('should deleteCompany() dispatch action', () => {
    const deleteCompanySpy = spyOn(
      component,
      'deleteCompany'
    ).and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.deleteCompany();

    expect(deleteCompanySpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      deleteCompany({
        payload: { id: component.companyId as number, returnUrl: '/admin' },
      })
    );
  });

  it('should changeTab() dispatch action', () => {
    const changeTabSpy = spyOn(component, 'changeTab').and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.changeTab(1);

    expect(changeTabSpy).toHaveBeenCalled();
    expect(component.selectedTabIndex).toEqual(1);
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      setAdminCompanyTab({
        payload: component.selectedTabIndex,
      })
    );
  });
});
