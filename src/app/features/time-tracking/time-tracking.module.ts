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
import {
  MAT_DATE_FORMATS,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';
import { DayComponent } from './components/day/day.component';
import { AddEntryDialogComponent } from './components/add-entry-dialog/add-entry-dialog.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [TimeTrackingComponent, DayComponent, AddEntryDialogComponent],
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
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TimeTrackingModule {}
