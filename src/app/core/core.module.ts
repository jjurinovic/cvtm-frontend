import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, TitleStrategy } from '@angular/router';

import { BaseComponent } from './layout/base/base.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { PageTitleStrategy } from './strategies/page-title-strategy';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NavigationComponent,
    PageTitleComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
  ],
})
export class CoreModule {}
