import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: `Admin Settings`,
  },
  {
    path: 'company/:id/edit',
    component: CompanyFormComponent,
    title: 'Edit Company',
  },
  {
    path: 'company/create',
    component: CompanyFormComponent,
    title: 'Create Company',
  },
  {
    path: 'company/:companyId/user/:id/edit',
    component: UserFormComponent,
    title: 'Edit User',
  },
  {
    path: 'company/:companyId/user/create',
    component: UserFormComponent,
    title: 'Create User',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
