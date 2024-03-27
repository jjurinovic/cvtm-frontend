import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  readonly duration: number = 30000;

  show(message: string, title: string, css: string, duration?: number) {
    this.snackBar.open(title, message, {
      duration: duration || this.duration,
      panelClass: [css],
    });
  }

  error(message: string, duration?: number) {
    this.show(message, 'ERROR', 'error-snackbar', duration);
  }

  success(message: string, duration?: number) {
    this.show(message, 'SUCCESS', 'success-snackbar', duration);
  }

  warn(message: string, duration?: number) {
    this.show(message, 'WARNING', 'warn-snackbar', duration);
  }
}
