import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectsRoutingModule } from './projects.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { ProjectUsersComponent } from './components/project-users/project-users.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, ProjectFormComponent, ProjectInfoComponent, ProjectUsersComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProjectsModule {}
