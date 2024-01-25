import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './admin.routing';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, MatTabsModule],
})
export class AdminModule {}
