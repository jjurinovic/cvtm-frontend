import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CompanyCreateComponent } from './components/company-create/company-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  { path: 'company/create', component: CompanyCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
