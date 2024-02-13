import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { NavItem } from '../../models/nav-item.model';
import { Role } from 'src/app/features/users/enums/role.enum';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  links: NavItem[] = [
    {
      link: '/admin',
      title: 'Admin',
      minRole: Role.ROOT,
    },
    {
      link: '/dashboard',
      title: 'Dashboard',
    },
    {
      link: '/company',
      title: 'Company',
      excludeRole: Role.ROOT,
    },
    {
      link: '/time-tracking',
      title: 'Time Tracking',
    },
  ];

  userRole!: Role;

  constructor(private store: Store) {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.userRole = user.role;
      }
    });
  }
}
