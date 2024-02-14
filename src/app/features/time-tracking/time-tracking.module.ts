import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';
import { DayComponent } from './components/day/day.component';
import { AddEntryDialogComponent } from './components/add-entry-dialog/add-entry-dialog.component';

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
  ],
})
export class TimeTrackingModule {}
