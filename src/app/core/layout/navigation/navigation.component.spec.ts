import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MatListModule } from '@angular/material/list';

import { NavigationComponent } from './navigation.component';
import { HasRoleDirective } from 'src/app/shared/directives/has-role.directive';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let service: AuthService;
  let store: MockStore;

  const testLinks = [
    { link: 'test1', title: 'Test 1' },
    { link: 'test2', title: 'Test 2', excludeRole: Role.MODERATOR },
    { link: 'test3', title: 'Test 3', minRole: Role.ROOT },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        MatListModule,
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        HasRoleDirective,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
    service.setRole(Role.ROOT);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mat-nav-list', () => {
    const matNav = fixture.debugElement.query(By.css('mat-nav-list'));
    expect(matNav).toBeTruthy();
  });

  it('should render 3 navigation items', () => {
    component.links = testLinks;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.navigation-item'));

    expect(items.length).toEqual(3);
  });

  it('should render 2 navigation items when user role is USER', () => {
    component.links = testLinks;
    service.setRole(Role.USER);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.navigation-item'));

    expect(items.length).toEqual(2);
  });

  it('should render 2 navigation items when user role is ADMIN', () => {
    component.links = testLinks;
    service.setRole(Role.ADMIN);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.navigation-item'));

    expect(items.length).toEqual(2);
  });
});
