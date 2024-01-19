import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  links = [
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
