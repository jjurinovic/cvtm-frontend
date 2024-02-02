import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackbar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
    });
    service = TestBed.inject(SnackbarService);
    snackbar = TestBed.inject(MatSnackBar);
    spyOn(snackbar, 'open').and.callThrough();
    spyOn(service, 'show').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call show() method', () => {
    service.show('test message', 'test title', 'custom-css');
    expect(service.show).toHaveBeenCalledWith(
      'test message',
      'test title',
      'custom-css'
    );
    expect(snackbar.open).toHaveBeenCalled();
  });

  it('should call error() method', () => {
    service.error('test message');
    expect(service.show).toHaveBeenCalledWith(
      'test message',
      'ERROR',
      'error-snackbar',
      undefined
    );
    expect(snackbar.open).toHaveBeenCalled();
  });
});
