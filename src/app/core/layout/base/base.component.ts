import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { currentUser } from 'src/app/features/users/state/users.actions';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private _loading = inject(LoadingService);

  ngOnInit(): void {
    this.store.dispatch(currentUser());
    this._loading.isAppLoaded = true;
  }

  ngOnDestroy(): void {
    this._loading.isAppLoaded = false;
  }
}
