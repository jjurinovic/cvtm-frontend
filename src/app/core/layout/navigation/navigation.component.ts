import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { NavItem } from '../../models/nav-item.model';
import { NAVIGATION_LINKS } from 'src/app/constants/navigation';

import { Role } from 'src/app/features/users/enums/role.enum';
import { selectCurrentUser } from 'src/app/features/users/state/user.selectors';
import { Company } from 'src/app/features/company/models/company.model';
import { AuthService } from '../../services/auth.service';
import * as CompanyActions from 'src/app/features/company/state/company.actions';
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
  private store: Store = inject(Store);
  private _auth: AuthService = inject(AuthService);

  links: NavItem[] = NAVIGATION_LINKS;

  userRole!: Role;
  companies: Company[] = [];
  rootRole: Role = Role.ROOT;
  companyId?: number;

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.userRole = user.role;
      }
    });

    if (this._auth.getRole() === Role.ROOT) {
      this.store.dispatch(
        CompanyActions.getAll({
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
    this.store.dispatch(CompanyActions.setCompanyId({ payload: companyId }));
  }
}
