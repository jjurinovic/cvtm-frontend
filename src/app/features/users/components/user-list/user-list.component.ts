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
  selectUsersPageFilter,
} from 'src/app/features/users/state/user.selectors';
import * as UserActions from '../../state/users.actions';
import { SortDirection } from '@angular/material/sort';
import { PageFilter } from 'src/app/shared/models/page-filter.mode';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from '../../enums/role.enum';
import { selectCompanyId } from 'src/app/features/company/state/company.selectors';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  displayedColumns: string[] = [
    'last_name',
    'first_name',
    'email',
    'role',
    'address',
    'action',
  ];
  users: User[] = [];
  pageFilter: PageFilter = {
    page: 1,
    size: 10,
    total: 0,
    sort: null,
    sort_field: null,
    q: null,
  };
  private debounceTime = 500;

  companyId!: number;
  @Input() companyInactive: boolean = false;
  @ViewChild('input') input?: ElementRef;

  constructor(private store: Store, private _auth: AuthService) {}

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe((data) => {
      this.users = data;
    });

    this.store
      .select(selectUsersPageFilter)
      .subscribe((pageFilter) => (this.pageFilter = { ...pageFilter }));

    if (this._auth.getRole() === Role.ROOT) {
      this.store.select(selectCompanyId).subscribe((companyId) => {
        if (companyId) this.companyId = companyId;
        this.getData();
      });
    } else {
      this.getData();
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(() => {
          this.pageFilter.q = this.input?.nativeElement.value;
          this.getData();
        })
      )
      .subscribe();
  }

  getData(): void {
    this.store.dispatch(
      UserActions.getAllUsers({
        payload: {
          companyId: this.companyId,
          ...this.pageFilter,
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
