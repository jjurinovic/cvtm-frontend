import { Component, ViewChild } from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild(MatDrawer) drawer: any;

  constructor(private _loading: LoadingService) {}

  toggleSidebar(): void {
    this.drawer.toggle();
  }

  isLoading(): boolean {
    return this._loading.loading();
  }
}
