import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/features/users/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() onMenuClick: EventEmitter<any> = new EventEmitter();
  currentUser?: User;

  constructor(
    private _auth: AuthService,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
  }

  logout(): void {
    this._auth.logout();
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
