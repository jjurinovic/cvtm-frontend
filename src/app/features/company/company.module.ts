import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company.routing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CompanyEditComponent,
    CompanyInfoComponent,
    CompanyComponent,
    CompanyFormComponent,
    CompanyListComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CompanyModule {}
