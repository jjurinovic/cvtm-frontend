import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { selectCompanyId } from 'src/app/features/company/state/company.selectors';
import { selectProject } from '../../state/projects.selectors';
import { Project } from '../../models/project.model';
import * as ProjectActions from '../../state/projects.actions';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
})
export class ProjectInfoComponent {
  projectId!: number;
  companyId!: number;
  project?: Project;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (!!id) {
        this.projectId = +id;
        this.getProject(this.projectId as number);
      }
    });

    this.store.select(selectCompanyId).subscribe((id) => {
      if (id) {
        this.companyId = id;
      }
    });

    this.store.select(selectProject).subscribe((project) => {
      if (project) {
        this.project = project;
      }
    });
  }

  private getProject(projectId: number): void {
    this.store.dispatch(ProjectActions.getProject({ payload: projectId }));
  }

  createProject(project: Project): void {
    this.store.dispatch(ProjectActions.createProject({ payload: project }));
  }

  updateProject(project: Project): void {
    this.store.dispatch(ProjectActions.updateProject({ payload: project }));
  }

  assignUsers(userIds: number[]): void {
    this.store.dispatch(
      ProjectActions.assignUsers({
        payload: { project_id: this.projectId, users: userIds },
      })
    );
  }

  removeUser(userId: number): void {
    this.store.dispatch(
      ProjectActions.removeUsers({
        payload: { project_id: this.projectId, users: [userId] },
      })
    );
  }
}
