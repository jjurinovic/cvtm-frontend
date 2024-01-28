import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: `Admin Settings`,
  },
  {
    path: 'company/create',
    component: CompanyCreateComponent,
    title: 'Create Company',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
