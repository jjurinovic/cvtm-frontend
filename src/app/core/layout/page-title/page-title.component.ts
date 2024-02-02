import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent implements OnInit {
  pageTitle: string = '';
  constructor(private _page: PageService) {}

  ngOnInit(): void {
    this.pageTitle = this._page.getTitle();
    this._page.pageTitle$.subscribe((title) => (this.pageTitle = title));
  }
}
