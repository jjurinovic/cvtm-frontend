import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LoaderComponent } from './components/loader/loader.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { RolePipe } from './pipes/role.pipe';
import { AdressFormComponent } from './components/adress-form/adress-form.component';
import { ReactiveFormsModule } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MomentDateModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MomentDateModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    HasRoleDirective,
    LoaderComponent,
    RolePipe,
    AdressFormComponent,
  ],
  declarations: [
    HasRoleDirective,
    LoaderComponent,
    RolePipe,
    AdressFormComponent,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class SharedModule {}
