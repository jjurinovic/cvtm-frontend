import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { login } from 'src/app/state/auth/auth.actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [provideMockStore()],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form on init', () => {
    expect(component.form.value).toEqual({ username: '', password: '' });
  });

  it('should have disabled submit button on init', () => {
    const loginBtn = fixture.debugElement.query(By.css('.login-submit'));
    expect(loginBtn.nativeElement.disabled).toBeTruthy();
  });

  it('should call login method on submit with fake credentials', () => {
    spyOn(component, 'submit').and.callThrough();

    const userObj = { username: 'test', password: 'test' };

    component.form.setValue(userObj);
    fixture.detectChanges();

    const loginBtn = fixture.debugElement.query(By.css('.login-submit'));
    loginBtn.nativeElement.click();

    expect(component.submit).toHaveBeenCalled();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(login({ payload: userObj }));
  });
});
