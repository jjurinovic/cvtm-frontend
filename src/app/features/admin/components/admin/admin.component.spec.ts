import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AdminComponent } from './admin.component';
import { CompanyListComponent } from '../../../company/components/company-list/company-list.component';
import { UserListComponent } from '../../../users/components/user-list/user-list.component';
import { selectAdminTabIndex } from '../../state/admin.selectors';
import { By } from '@angular/platform-browser';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, CompanyListComponent, UserListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAdminTabIndex,
              value: 2,
            },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    spyOn(store, 'select').and.callThrough();
    fixture = TestBed.createComponent(AdminComponent);
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

  it('should call store select', () => {
    expect(store.select).toHaveBeenCalledWith(selectAdminTabIndex);
    expect(component.selectedTabIndex).toEqual(2);
  });

  it('should call changeTab() and change index', () => {
    const changeTabSpy = spyOn(component, 'changeTab').and.callThrough();
    component.changeTab(1);

    expect(changeTabSpy).toHaveBeenCalledWith(1);
    expect(component.selectedTabIndex).toEqual(1);
  });
});
