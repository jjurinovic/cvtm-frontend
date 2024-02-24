import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: boolean = false;
  isAppLoaded: boolean = false;
  constructor() {}

  start(): void {
    this.isLoading = true;
  }

  stop(): void {
    this.isLoading = false;
  }

  loading(): boolean {
    return this.isLoading;
  }
}
