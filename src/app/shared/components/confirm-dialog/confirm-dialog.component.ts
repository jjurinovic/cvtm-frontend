import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from './confirm-dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {}
}
