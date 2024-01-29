import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { CompanyCreateComponent } from './company-create.component';
import { Company } from 'src/app/features/company/models/company.model';

describe('CompanyCreateComponent', () => {
  let component: CompanyCreateComponent;
  let fixture: ComponentFixture<CompanyCreateComponent>;
  let store: MockStore;

  const testCompany: Company = {
    name: 'test company',
    vat: '1234',
    address: {
      address1: 'test address1',
      address2: 'test address2',
      city: 'test city',
      postcode: 'test postcode',
      county: 'test county',
      country: 'test country',
    },
  };

  const requiredFields = ['name', 'address1', 'city', 'postcode', 'country'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyCreateComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should have empty form on start', () => {
    expect(component.form.value).toEqual({
      name: null,
      vat: null,
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
    const btn = fixture.debugElement.query(By.css('button'));

    btn.nativeElement.click();

    expect(submitSpy).toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should call submit() and dispatch on form submit on not empty form', () => {
    const submitSpy = spyOn(component, 'submit').and.callThrough();
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.form.setValue(testCompany);
    const btn = fixture.debugElement.query(By.css('button'));

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
});
