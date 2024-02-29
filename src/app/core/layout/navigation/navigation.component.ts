import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { NavItem } from '../../models/nav-item.model';
import { Role } from 'src/app/features/users/enums/role.enum';
import { selectCurrentUser } from 'src/app/features/users/state/user.selectors';
import { Company } from 'src/app/features/company/models/company.model';
import { AuthService } from '../../services/auth.service';
import {
  getAll,
  setCompanyId,
} from 'src/app/features/company/state/company.actions';
import {
  selectAllCompanies,
  selectCompanyId,
} from 'src/app/features/company/state/company.selectors';

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
    {
      link: '/users',
      title: 'Users',
      minRole: Role.MODERATOR,
    },
    {
      link: '/time-tracking',
      title: 'Time Tracking',
    },
  ];

  userRole!: Role;
  companies: Company[] = [];
  rootRole: Role = Role.ROOT;
  companyId?: number;

  constructor(private store: Store, private _auth: AuthService) {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.userRole = user.role;
      }
    });

    if (this._auth.getRole() === Role.ROOT) {
      this.store.dispatch(
        getAll({
          payload: {
            page: 1,
            size: 100,
          },
        })
      );

      this.store.select(selectAllCompanies).subscribe((data) => {
        this.companies = data;
      });

      this.store.select(selectCompanyId).subscribe((companyId) => {
        if (companyId) this.companyId = companyId;
      });
    }
  }

  companyChange(companyId: number): void {
    this.store.dispatch(setCompanyId({ payload: companyId }));
  }
}
