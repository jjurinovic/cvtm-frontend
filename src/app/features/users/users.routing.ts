import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      breadcrumb: 'Users',
    },
    children: [
      {
        path: '',
        component: UserListComponent,
        title: 'User List',
        data: {
          breadcrumb: 'List',
        },
      },
      {
        path: ':id/edit',
        component: UserFormComponent,
        title: 'User Edit',
        data: {
          breadcrumb: 'Edit',
        },
      },
      {
        path: 'create',
        component: UserFormComponent,
        title: 'User Create',
        data: {
          breadcrumb: 'Create',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
