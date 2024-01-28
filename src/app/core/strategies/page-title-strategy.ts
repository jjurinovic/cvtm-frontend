import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageService } from '../services/page.service';

@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, private _page: PageService) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this._page.setTitle(title);
      this.title.setTitle(`${title} | ${environment.appName}`);
    }
  }
}
