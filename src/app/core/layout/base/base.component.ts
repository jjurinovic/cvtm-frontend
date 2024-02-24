import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { currentUser } from '../../../state/auth/auth.actions';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private _loading: LoadingService) {}

  ngOnInit(): void {
    this.store.dispatch(currentUser());
    this._loading.isAppLoaded = true;
  }

  ngOnDestroy(): void {
    this._loading.isAppLoaded = false;
  }
}
