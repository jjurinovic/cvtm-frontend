import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from 'src/app/features/users/models/user.model';
import { Store } from '@ngrx/store';
import { selectCompanyId } from 'src/app/features/company/state/company.selectors';
import { selectAllUsers } from 'src/app/features/users/state/user.selectors';
import { getAllUsers } from 'src/app/features/users/state/users.actions';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.scss',
})
export class ProjectUsersComponent {
  @Input({ required: true }) set users(users: User[]) {
    this.selectedIds = users.map((user) => user.id);
    this._users = users;

    this.allUsersFiltered = this.allUsers.filter(
      (user) => this.selectedIds.indexOf(user.id) < 0
    );
  }
  _users: User[] = [];
  displayedColumns = ['first_name', 'last_name', 'actions'];
  allUsers: User[] = [];
  allUsersFiltered: User[] = [];
  selectedIds: number[] = [];

  @Output() removeUser: EventEmitter<number> = new EventEmitter();
  @Output() assignUsers: EventEmitter<number[]> = new EventEmitter();

  constructor(private store: Store) {
    this.store.select(selectCompanyId).subscribe((companyId) => {
      if (companyId) {
        this.store.dispatch(
          getAllUsers({ payload: { companyId, page: 1, size: 100 } })
        );
      }
    });
    this.store.select(selectAllUsers).subscribe((users) => {
      this.allUsers = users;
      this.allUsersFiltered = users.filter(
        (user) => this.selectedIds.indexOf(user.id) < 0
      );
    });
  }

  onSelect(aa: any): void {
    console.log(aa);
  }
}
