import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../state/auth/auth.selectors';
import { User } from 'src/app/features/users/models/user.model';
import { currentUser } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  constructor(private store: Store) {
    this.store.select(selectCurrentUser).subscribe((user: User) => {
      console.log(user);
      if (!user) {
        this.store.dispatch(currentUser());
      }
    });
  }
}
