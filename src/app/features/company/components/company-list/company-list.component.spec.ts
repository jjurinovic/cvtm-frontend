import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { CompanyListComponent } from './company-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { testCompanies } from 'src/test-data/data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/features/users/enums/role.enum';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let store: MockStore;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    service.setRole(Role.ROOT)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should method getData() dispatch action to store', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    component.getData();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should render empty table', () => {
    const table = fixture.debugElement.query(By.directive(MatTable));
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(table).toBeTruthy();

    // one row is for no data row
    expect(rows.length).toEqual(1);
  });

  it('should render table with 2 rows', () => {
    component.companies = testCompanies;
    const table = fixture.debugElement.query(By.directive(MatTable));
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(table).toBeTruthy();
    expect(rows.length).toEqual(2);
  });

  it('should render pagination', () => {
    const pagination = fixture.debugElement.query(By.directive(MatPaginator));
    expect(pagination).toBeTruthy();
  });

  it('should clearSearch reset search value', () => {
    const spy = spyOn(component, 'clearSearch').and.callThrough();
    component.pageFilter.q = 'test';
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('#search-clear'));

    clearBtn.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.pageFilter.q).toBeFalsy();
  });

  it('should getSort() return current sort direction', () => {
    component.pageFilter.sort = 'asc';

    expect(component.getSort()).toEqual('asc');
  });

  it('should getSortField() return current sort field', () => {
    component.pageFilter.sort_field = 'name';

    expect(component.getSortField()).toEqual('name');
  });

  it('should onSort() set sort and get data', () => {
    const getDataSpy = spyOn(component, 'getData').and.callThrough();
    component.onSort({ active: 'name', direction: 'asc' });

    expect(component.pageFilter.sort).toEqual('asc');
    expect(component.pageFilter.sort_field).toEqual('name');
    expect(getDataSpy).toHaveBeenCalled();
  });

  it('should pageChange() set page and size and get data', () => {
    const getDataSpy = spyOn(component, 'getData').and.callThrough();
    component.pageChange({ pageIndex: 12, pageSize: 25 });

    expect(component.pageFilter.page).toEqual(13);
    expect(component.pageFilter.size).toEqual(25);
    expect(getDataSpy).toHaveBeenCalled();
  });
});
