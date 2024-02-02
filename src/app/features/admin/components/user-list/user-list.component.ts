import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';

import { User } from 'src/app/features/users/models/user.model';
import {
  selectAllUsers,
  selectPageUsers,
  selectSearchUsers,
  selectSizeUsers,
  selectSortFieldUsers,
  selectSortUsers,
  selectTotalUsers,
} from 'src/app/features/users/state/user.selectors';
import { selectTotalCompanies } from '../../../company/state/company.selectors';
import * as UserActions from '../../../users/state/users.actions';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  displayedColumns: string[] = ['name', 'email', 'role', 'address', 'action'];
  users: User[] = [];
  total: number | null = 0;
  page: number = 1;
  size: number = 10;
  sort: string | null = null;
  sortField: string | null = null;
  searchValue: string | null = null;
  private debounceTime = 500;

  @Input() companyId!: number;
  @ViewChild('input') input?: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe((data) => {
      this.users = data;
    });

    this.store
      .select(selectTotalUsers)
      .subscribe((total) => (this.total = total));

    this.store
      .select(selectPageUsers)
      .subscribe((page) => (this.page = page - 1));

    this.store.select(selectSizeUsers).subscribe((size) => (this.size = size));

    this.store.select(selectSortUsers).subscribe((sort) => (this.sort = sort));

    this.store
      .select(selectSortFieldUsers)
      .subscribe((sortField) => (this.sortField = sortField));

    this.store
      .select(selectSearchUsers)
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

  getData(): void {
    console.log(this.page);
    this.store.dispatch(
      UserActions.getAllUsers({
        payload: {
          companyId: this.companyId,
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
    console.log('page change');
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
