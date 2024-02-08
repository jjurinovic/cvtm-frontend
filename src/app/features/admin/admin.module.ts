import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './admin.routing';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RolePipe } from 'src/app/shared/pipes/role.pipe';

@NgModule({
  declarations: [
    AdminComponent,
    CompanyListComponent,
    CompanyFormComponent,
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    RolePipe,
    MatSelectModule,
    MatChipsModule,
    MatSlideToggleModule,
  ],
})
export class AdminModule {}
