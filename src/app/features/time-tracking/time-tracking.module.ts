import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';
import { DayComponent } from './components/day/day.component';

@NgModule({
  declarations: [TimeTrackingComponent, DayComponent],
  imports: [
    CommonModule,
    TimeTrackingRoutingModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
  ],
})
export class TimeTrackingModule {}
