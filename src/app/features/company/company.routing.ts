import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './components/company/company.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';

import { companyListResolver } from './resolvers/company-list.resolver';
import { companyListGuard } from './guards/company-list.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent,
        canActivate: [companyListGuard],
        resolve: {
          companies: companyListResolver,
        },
        title: 'Company List',
      },
      {
        path: ':id/edit',
        component: CompanyFormComponent,
        title: 'Edit Company',
      },
      {
        path: 'edit',
        component: CompanyFormComponent,
        title: 'Edit Company',
      },
      {
        path: 'create',
        component: CompanyFormComponent,
        title: 'Create Company',
      },
      {
        path: 'info',
        component: CompanyInfoComponent,
        title: 'Company Info',
      },
      {
        path: 'edit',
        component: CompanyEditComponent,
        title: 'Company Edit',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
