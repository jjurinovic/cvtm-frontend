import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Company } from 'src/app/features/company/models/company.model';
import * as CompanyActions from '../../../company/state/company.actions';
import {
  selectAllCompanies,
  selectPageCompanies,
  selectSizeCompanies,
  selectSortCompanies,
  selectSortFieldCompanies,
  selectTotalCompanies,
} from 'src/app/features/company/state/company.selectors';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'vat', 'address'];
  companies: Company[] = [];
  total: number | null = 0;
  page: number = 1;
  size: number = 10;
  sort: string | null = null;
  sortField: string | null = null;

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

    this.getData(this.page + 1, this.size, this.sort, this.sortField);
  }

  private getData(
    page: number,
    size: number,
    sort: string | null,
    sortField: string | null
  ): void {
    this.store.dispatch(
      CompanyActions.getAll({
        payload: { page, size, sort, sortField },
      })
    );
  }

  pageChange({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }): void {
    const page = pageIndex + 1;
    const size = pageSize;
    this.getData(page, size, this.sort, this.sortField);
  }

  onSort({ active, direction }: { active: string; direction: string }): void {
    const sort = direction;
    const sortField = active;
    const page = this.page + 1;
    this.getData(page, this.size, sort, sortField);
  }

  getSortField(): string {
    return this.sortField || '';
  }

  getSort(): SortDirection {
    return (this.sort as SortDirection) || '';
  }
}
