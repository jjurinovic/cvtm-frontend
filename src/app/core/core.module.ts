import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './layout/base/base.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [BaseComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule],
})
export class CoreModule {}
