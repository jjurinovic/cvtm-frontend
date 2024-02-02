import { Component, ViewChild } from '@angular/core';

import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  @ViewChild(MatDrawer) drawer: any;

  toggleSidebar(): void {
    this.drawer.toggle();
  }
}
