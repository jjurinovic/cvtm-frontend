import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { PageService } from '../../services/page.service';
import { Title } from '@angular/platform-browser';

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
