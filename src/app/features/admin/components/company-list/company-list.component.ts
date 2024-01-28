import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Company } from 'src/app/features/company/models/company.model';
import * as CompanyActions from '../../../company/state/company.actions';
import { selectAllCompanies } from 'src/app/features/company/state/company.selectors';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'vat', 'address'];
  companies: Company[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CompanyActions.getAll());

    this.store.select(selectAllCompanies).subscribe((data) => {
      this.companies = data;
    });
  }
}
