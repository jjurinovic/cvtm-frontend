import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { ProfileComponent } from './profile.component';
import { initialState } from '../../features/users/state/user.reducers';
import { By } from '@angular/platform-browser';
import { testUserWithAddress } from 'src/test-data/data';
import { selectCurrentUser } from 'src/app/features/users/state/user.selectors';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCurrentUser,
              value: testUserWithAddress,
            },
          ],
        }),
      ],
      imports: [
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store select and set form', () => {
    expect(store.select).toHaveBeenCalled();
    expect(component.form).toBeTruthy();
  });

  it('should getRole() return role name by Role enum', () => {
    spyOn(component, 'getRole').and.callThrough();
    //fixture.detectChanges();
    const role = component.getRole();

    expect(component.getRole).toHaveBeenCalledWith();
    expect(role).toEqual('ADMIN');
  });

  it('should call submit()', () => {
    const submitBtn = fixture.debugElement.query(By.css('#profile-submit'));
    spyOn(component, 'submit').and.callThrough();
    submitBtn.nativeElement.click();

    expect(component.submit).toHaveBeenCalled();
    expect(component.form.valid).toBeTrue();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
