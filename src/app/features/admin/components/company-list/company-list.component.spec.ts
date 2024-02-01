import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { CompanyListComponent } from './company-list.component';
import { Company } from 'src/app/features/company/models/company.model';

describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;
  let store: MockStore;
  let testCompanies: Company[] = [
    {
      name: 'test1',
      vat: 'test1',
      address: {
        address1: 'address1 test 1',
        address2: 'address2 test 1',
        city: 'city test 1',
        postcode: 'postcode test 1',
        county: 'county test 1',
        country: 'country test 1',
      },
    },
    {
      name: 'test1',
      vat: 'test2',
      address: {
        address1: 'address1 test 2',
        address2: 'address2 test 2',
        city: 'city test 2',
        postcode: 'postcode test 2',
        county: 'county test 2',
        country: 'country test 2',
      },
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
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
    expect(rows.length).toEqual(0);
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
    component.searchValue = 'test';
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('#search-clear'));

    clearBtn.nativeElement.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(component.searchValue).toBeFalsy();
  });

  it('should getSort() return current sort direction', () => {
    component.sort = 'asc';

    expect(component.getSort()).toEqual('asc');
  });

  it('should getSortField() return current sort field', () => {
    component.sortField = 'name';

    expect(component.getSortField()).toEqual('name');
  });

  it('should onSort() set sort and get data', () => {
    const getDataSpy = spyOn(component, 'getData').and.callThrough();
    component.onSort({ active: 'name', direction: 'asc' });

    expect(component.sort).toEqual('asc');
    expect(component.sortField).toEqual('name');
    expect(getDataSpy).toHaveBeenCalled();
  });

  it('should pageChange() set page and size and get data', () => {
    const getDataSpy = spyOn(component, 'getData').and.callThrough();
    component.pageChange({ pageIndex: 12, pageSize: 25 });

    expect(component.page).toEqual(12);
    expect(component.size).toEqual(25);
    expect(getDataSpy).toHaveBeenCalled();
  });
});
