import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, throwError } from 'rxjs';

import { logout } from '../state/auth/auth.actions';
import { SnackbarService } from '../shared/services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private store = inject(Store);
  private snackBar = inject(SnackbarService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.store.dispatch(logout({ payload: true }));
        }
        this.snackBar.error(error.error.detail || 'Server error');
        return throwError(() => error);
      })
    );
  }
}
