import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
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
