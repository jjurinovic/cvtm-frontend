import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SortDirection } from '@angular/material/sort';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';

import { Company } from 'src/app/features/company/models/company.model';
import * as CompanyActions from '../../../company/state/company.actions';
import {
  selectAllCompanies,
  selectPageCompanies,
  selectSearchCompanies,
  selectSizeCompanies,
  selectSortCompanies,
  selectSortFieldCompanies,
  selectTotalCompanies,
} from 'src/app/features/company/state/company.selectors';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'vat', 'address'];
  companies: Company[] = [];
  total: number | null = 0;
  page: number = 1;
  size: number = 10;
  sort: string | null = null;
  sortField: string | null = null;
  searchValue: string | null = null;
  private debounceTime = 500;

  @ViewChild('input') input?: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAllCompanies).subscribe((data) => {
      this.companies = data;
    });

    this.store
      .select(selectTotalCompanies)
      .subscribe((total) => (this.total = total));

    this.store
      .select(selectPageCompanies)
      .subscribe((page) => (this.page = page - 1));

    this.store
      .select(selectSizeCompanies)
      .subscribe((size) => (this.size = size));

    this.store
      .select(selectSortCompanies)
      .subscribe((sort) => (this.sort = sort));

    this.store
      .select(selectSortFieldCompanies)
      .subscribe((sortField) => (this.sortField = sortField));

    this.store
      .select(selectSearchCompanies)
      .subscribe((q) => (this.searchValue = q));
    this.getData();
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => {
          this.searchValue = this.input?.nativeElement.value;
          this.getData();
        })
      )
      .subscribe();
  }

  private getData(): void {
    this.store.dispatch(
      CompanyActions.getAll({
        payload: {
          page: this.page + 1,
          size: this.size,
          sort: this.sort,
          sortField: this.sortField,
          q: this.searchValue,
        },
      })
    );
  }

  /** Page change */
  pageChange({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }): void {
    this.page = pageIndex;
    this.size = pageSize;
    this.getData();
  }

  /** On sort */
  onSort({ active, direction }: { active: string; direction: string }): void {
    this.sort = direction;
    this.sortField = active;
    this.getData();
  }

  getSortField(): string {
    return this.sortField || '';
  }

  getSort(): SortDirection {
    return (this.sort as SortDirection) || '';
  }

  clearSearch(): void {
    this.searchValue = null;
    this.getData();
  }
}
