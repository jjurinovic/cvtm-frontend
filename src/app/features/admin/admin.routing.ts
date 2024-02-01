import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: `Admin Settings`,
  },
  {
    path: 'company/create',
    component: CompanyFormComponent,
    title: 'Create Company',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
