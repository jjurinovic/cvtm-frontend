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

import { CompanyFormComponent } from './company-form.component';
import { UserListComponent } from '../user-list/user-list.component';
import { testCompany } from 'src/test-data/data';

describe('CompanyFormComponent', () => {
  let component: CompanyFormComponent;
  let fixture: ComponentFixture<CompanyFormComponent>;
  let store: MockStore;

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
      ],
      providers: [
        provideMockStore(),
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
});
