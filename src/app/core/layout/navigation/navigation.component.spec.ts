import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NavigationComponent } from './navigation.component';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';
import { SharedModule } from 'src/app/shared/shared.module';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let service: AuthService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        SharedModule,
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

  //TODO: add more tests
});
