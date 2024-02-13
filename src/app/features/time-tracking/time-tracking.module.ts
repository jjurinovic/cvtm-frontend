import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';
import { TimeTrackingRoutingModule } from './time-tracking.routing';

@NgModule({
  declarations: [TimeTrackingComponent],
  imports: [CommonModule, TimeTrackingRoutingModule],
})
export class TimeTrackingModule {}
