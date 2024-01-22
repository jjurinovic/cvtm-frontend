import { Component } from '@angular/core';
import { NavItem } from '../../models/nav-item.model';
import { Role } from 'src/app/features/users/enums/role.enum';

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
    },
  ];
}
