import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { currentUser } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(currentUser());
  }
}
