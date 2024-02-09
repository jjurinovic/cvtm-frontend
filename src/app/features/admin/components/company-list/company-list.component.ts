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
  selectCompanyPageFilter,
} from 'src/app/features/company/state/company.selectors';
import { CompanyPageFilter } from 'src/app/features/company/models/company-page-filter.model';
import { PageFilter } from 'src/app/shared/models/page-filter.mode';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'vat', 'address', 'action'];
  companies: Company[] = [];
  pageFilter: CompanyPageFilter = {
    page: 1,
    size: 10,
    total: 0,
    sort: null,
    sort_field: null,
    q: null,
  };
  private debounceTime = 500;

  @ViewChild('input') input?: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAllCompanies).subscribe((data) => {
      this.companies = data;
    });

    this.store.select(selectCompanyPageFilter).subscribe((pageFilter) => {
      this.pageFilter = { ...(pageFilter as PageFilter) };
    });

    this.getData();
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => {
          console.log(this.pageFilter);
          this.pageFilter.q = this.input?.nativeElement.value;
          this.getData();
        })
      )
      .subscribe();
  }

  getData(): void {
    this.store.dispatch(
      CompanyActions.getAll({
        payload: this.pageFilter,
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
    this.pageFilter.page = pageIndex + 1;
    this.pageFilter.size = pageSize;
    this.getData();
  }

  /** On sort */
  onSort({ active, direction }: { active: string; direction: string }): void {
    this.pageFilter.sort = direction;
    this.pageFilter.sort_field = active;
    this.getData();
  }

  getSortField(): string {
    return this.pageFilter.sort_field || '';
  }

  getSort(): SortDirection {
    return (this.pageFilter.sort as SortDirection) || '';
  }

  clearSearch(): void {
    this.pageFilter.q = null;
    this.getData();
  }
}
