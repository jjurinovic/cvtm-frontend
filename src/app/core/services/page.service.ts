import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  pageTitle: string = '';
  pageTitle$: Subject<string> = new Subject();

  constructor() {}

  public setTitle(title: string): void {
    this.pageTitle = title;
    this.pageTitle$.next(this.pageTitle);
  }

  public getTitle(): string {
    return this.pageTitle;
  }
}
