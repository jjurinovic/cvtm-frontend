import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './core/auth/login/login.component';
import { BaseComponent } from './core/layout/base/base.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './features/users/enums/role.enum';
import { ProfileComponent } from './general/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'My Profile',
        data: {
          breadcrumb: 'My Profile',
          animation: 'HomePage',
        },
      },
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
        data: { role: Role.ROOT, animation: 'AboutPage' },
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
        path: 'users',
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.module').then(
            (m) => m.ProjectsModule
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
  imports: [
    RouterModule.forRoot(routes, {
      enableViewTransitions: true,
      bindToComponentInputs: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
