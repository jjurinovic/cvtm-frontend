import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/auth/login/login.component';
import { BaseComponent } from './core/layout/base/base.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './features/users/enums/role.enum';
import { ProfileComponent } from './general/profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'profile', component: ProfileComponent, title: 'My Profile' },
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin',
        canActivate: [roleGuard, authGuard],
        canActivateChild: [roleGuard],
        data: { role: Role.ROOT },
        loadChildren: () =>
          import('./features/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('./features/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'time-tracking',
        loadChildren: () =>
          import('./features/time-tracking/time-tracking.module').then(
            (m) => m.TimeTrackingModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
