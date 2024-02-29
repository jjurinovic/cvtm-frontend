import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
        title: 'Project List',
      },
      {
        path: ':id/edit',
        component: ProjectFormComponent,
        title: 'Project Edit',
      },
      {
        path: 'create',
        component: ProjectFormComponent,
        title: 'Project Create',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
