import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CompanyActions from '../../../company/state/company.actions';
import { selectAllCompanies } from 'src/app/features/company/state/company.selectors';
import { Company } from 'src/app/features/company/models/company.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'vat', 'address'];
  companies: Company[] = [];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(CompanyActions.getAll());

    this.store.select(selectAllCompanies).subscribe((data) => {
      this.companies = data;
      console.log(this.companies);
    });
  }
}
