import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyRoutingModule } from './company.routing';
import { CompanyComponent } from './components/company/company.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CompanyEditComponent,
    CompanyListComponent,
    CompanyInfoComponent,
    CompanyComponent,
  ],
  imports: [CommonModule, CompanyRoutingModule, HttpClientModule],
})
export class CompanyModule {}
