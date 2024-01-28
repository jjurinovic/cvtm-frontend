import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]),
  ],
})
export class DashboardModule {}
