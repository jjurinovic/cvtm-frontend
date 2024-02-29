import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import { logout } from 'src/app/state/auth/auth.actions';
import { testUser } from 'src/test-data/data';
import { selectCurrentUser } from 'src/app/features/users/state/user.selectors';
import { SharedModule } from 'src/app/shared/shared.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  const initialState = {
    isLoggedIn: false,
    error: null,
    isLoading: false,
    user: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, SharedModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: selectCurrentUser,
              value: testUser,
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user from store', async () => {
    expect(store.select).toHaveBeenCalledWith(selectCurrentUser);
    expect(component.currentUser).toEqual(testUser);
  });

  it('should open confirm dialog', () => {
    const openDialogSpy = spyOn(component, 'openDialog');
    const logoutBtn = fixture.debugElement.query(By.css('.header-logout'));
    logoutBtn.nativeElement.click();

    fixture.detectChanges();
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('should call logout', () => {
    component.logout();

    expect(store.dispatch).toHaveBeenCalledWith(logout({}));
  });
});
