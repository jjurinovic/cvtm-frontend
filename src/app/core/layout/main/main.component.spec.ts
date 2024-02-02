import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MainComponent } from './main.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { HasRoleDirective } from 'src/app/shared/directives/has-role.directive';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';
import { PageTitleComponent } from '../page-title/page-title.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore;
  let service: AuthService;

  const initialState = {
    isLoggedIn: false,
    error: null,
    isLoading: false,
    user: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, NavigationComponent, PageTitleComponent],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule.forRoot([]),
        MatListModule,
        HttpClientTestingModule,
        HasRoleDirective,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    service.setRole(Role.USER);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Material Drawer', () => {
    const drawerContainer = fixture.debugElement.query(
      By.css('mat-drawer-container')
    );

    expect(drawerContainer).toBeTruthy();
  });

  it('should toggleSidebar() toggle sidebar', () => {
    let drawer = fixture.debugElement.query(By.css('.mat-drawer-opened'));

    // by default should be false
    expect(drawer).toBeFalsy();

    // should open sidebar
    component.toggleSidebar();
    fixture.detectChanges();

    drawer = fixture.debugElement.query(By.css('.mat-drawer-opened'));

    expect(drawer).toBeTruthy();

    // should close sidebar
    component.toggleSidebar();
    fixture.detectChanges();

    drawer = fixture.debugElement.query(By.css('.mat-drawer-opened'));

    expect(drawer).toBeFalsy();
  });

  it('should render app-navigation', () => {
    component.toggleSidebar();
    fixture.detectChanges();

    let navigation = fixture.debugElement.query(By.css('app-navigation'));
    expect(navigation).toBeTruthy();
  });
});
