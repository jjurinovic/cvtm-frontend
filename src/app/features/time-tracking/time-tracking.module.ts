import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';
import { DayComponent } from './components/day/day.component';
import { AddEntryDialogComponent } from './components/add-entry-dialog/add-entry-dialog.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { TimeEntryComponent } from './components/time-entry/time-entry.component';
import { DayTimeGridComponent } from './components/day-time-grid/day-time-grid.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
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
  declarations: [
    TimeTrackingComponent,
    DayComponent,
    AddEntryDialogComponent,
    TimeEntryComponent,
    DayTimeGridComponent,
  ],
  imports: [
    CommonModule,
    TimeTrackingRoutingModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMatTimepickerModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MomentDateModule,
    MatMenuModule,
    LoaderComponent,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class TimeTrackingModule {}
