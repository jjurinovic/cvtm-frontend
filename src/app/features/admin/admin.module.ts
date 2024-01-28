import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './admin.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MatButtonModule } from '@angular/material/button';
import { CompanyCreateComponent } from './components/company-create/company-create.component';

@NgModule({
  declarations: [AdminComponent, CompanyListComponent, CompanyCreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
