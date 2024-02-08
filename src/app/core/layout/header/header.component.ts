import { Component, EventEmitter, Output } from '@angular/core';

import { Store } from '@ngrx/store';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/features/users/models/user.model';
import { logout } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() onMenuClick: EventEmitter<any> = new EventEmitter();
  currentUser?: User;

  constructor(public dialog: MatDialog, private store: Store) {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
  }

  logout(): void {
    this.store.dispatch(logout({}));
  }

  openDialog(): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Logout',
        message: 'Are you sure you want to logout?',
        onYes: () => {
          this.logout();
        },
      },
    });
  }
}
