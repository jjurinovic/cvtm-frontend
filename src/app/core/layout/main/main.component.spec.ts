import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from '../navigation/navigation.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore;

  const initialState = {
    isLoggedIn: false,
    error: null,
    isLoading: false,
    user: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, NavigationComponent],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        RouterModule.forRoot([]),
        MatListModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
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
