import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { BaseComponent } from './base.component';
import { HeaderComponent } from '../header/header.component';
import { MainComponent } from '../main/main.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { AuthService } from '../../services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';
import { PageTitleComponent } from '../page-title/page-title.component';
import { initialState } from '../../../state/auth/auth.reducers';
import { currentUser } from 'src/app/features/users/state/users.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let store: MockStore;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BaseComponent,
        HeaderComponent,
        MainComponent,
        NavigationComponent,
        PageTitleComponent,
        BreadcrumbComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        StoreModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        SharedModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    service = TestBed.inject(AuthService);
    service.setRole(Role.USER);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action to get current user', () => {
    expect(store.dispatch).toHaveBeenCalledWith(currentUser());
  });
});
