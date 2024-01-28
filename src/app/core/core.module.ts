import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './layout/base/base.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, TitleStrategy } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { MatListModule } from '@angular/material/list';
import { HasRoleDirective } from '../shared/directives/has-role.directive';
import { PageTitleComponent } from './layout/page-title/page-title.component';
import { PageTitleStrategy } from './strategies/page-title-strategy';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent,
    MainComponent,
    LoginComponent,
    NavigationComponent,
    PageTitleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    HasRoleDirective,
  ],
  providers: [
    {
      provide: TitleStrategy,
      useClass: PageTitleStrategy,
    },
  ],
})
export class CoreModule {}
