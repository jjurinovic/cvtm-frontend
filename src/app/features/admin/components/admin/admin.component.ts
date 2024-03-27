import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectAdminTabIndex } from '../../state/admin.selectors';
import * as AdminActions from '../../state/admin.actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private store = inject(Store);
  selectedTabIndex: number = 1;

  ngOnInit(): void {
    this.store
      .select(selectAdminTabIndex)
      .subscribe((index) => (this.selectedTabIndex = index));
  }

  changeTab(index: number): void {
    this.selectedTabIndex = index;
    this.store.dispatch(
      AdminActions.setAdminTab({ payload: this.selectedTabIndex })
    );
  }
}
