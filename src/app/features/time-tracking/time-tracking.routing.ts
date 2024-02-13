import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TimeTrackingComponent } from './components/time-tracking/time-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: TimeTrackingComponent,
    title: `Time Tracking`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeTrackingRoutingModule {}
