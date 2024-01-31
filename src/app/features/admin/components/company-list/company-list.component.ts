import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Company } from 'src/app/features/company/models/company.model';
import * as CompanyActions from '../../../company/state/company.actions';
import {
  selectAllCompanies,
  selectPageCompanies,
  selectSizeCompanies,
  selectTotalCompanies,
} from 'src/app/features/company/state/company.selectors';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'vat', 'address'];
  companies: Company[] = [];
  total: number | null = 0;
  page: number | null = 1;
  size: number | null = 10;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      CompanyActions.getAll({ payload: { page: this.page, size: this.size } })
    );

    this.store.select(selectAllCompanies).subscribe((data) => {
      this.companies = data;
    });

    this.store
      .select(selectTotalCompanies)
      .subscribe((total) => (this.total = total));

    this.store
      .select(selectPageCompanies)
      .subscribe((page) => (this.page = (page as number) - 1));

    this.store
      .select(selectSizeCompanies)
      .subscribe((size) => (this.size = size));
  }

  private nextPage(page: number, size: number): void {
    this.store.dispatch(
      CompanyActions.getAll({
        payload: { page, size },
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
    this.nextPage(page, size);
  }
}
