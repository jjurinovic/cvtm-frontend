import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company.routing';
import { HttpClientModule } from '@angular/common/http';

import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyComponent } from './components/company/company.component';

@NgModule({
  declarations: [CompanyEditComponent, CompanyInfoComponent, CompanyComponent],
  imports: [CommonModule, CompanyRoutingModule, HttpClientModule],
})
export class CompanyModule {}
