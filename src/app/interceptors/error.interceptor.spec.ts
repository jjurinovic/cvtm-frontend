import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';

import { ErrorInterceptor } from './error.interceptor';
import { SnackbarService } from '../shared/services/snackbar.service';
@Component({})
class TestLoginComponent {}

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: MockStore;
  let routes = [{ path: 'login', component: TestLoginComponent }];
  let snackbar: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        provideMockStore(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    }).createComponent(TestLoginComponent);

    httpClient = TestBed.inject(HttpClient);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    snackbar = TestBed.inject(SnackbarService);
    spyOn(snackbar, 'error').and.callThrough();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should intercept request and if there is error 401 and call dispatch logout', () => {
    httpClient.get('/test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(store.dispatch).toHaveBeenCalled();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `/test`,
    });
    req.error(new ProgressEvent('error'), { status: 401 });
  });

  it('should call snackbar error method', () => {
    httpClient.get('/test').subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBeTruthy();
        expect(snackbar.error).toHaveBeenCalled();
      },
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `/test`,
    });
    req.error(new ProgressEvent('error'), { status: 401 });
  });
});
