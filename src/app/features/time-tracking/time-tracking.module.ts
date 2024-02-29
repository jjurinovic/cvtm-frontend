import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';
import { DayComponent } from './components/day/day.component';
import { AddEntryDialogComponent } from './components/add-entry-dialog/add-entry-dialog.component';
import { TimeEntryComponent } from './components/time-entry/time-entry.component';
import { DayTimeGridComponent } from './components/day-time-grid/day-time-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
})
export class TimeTrackingModule {}
