import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { selectCompanyId } from 'src/app/features/company/state/company.selectors';
import { Role } from 'src/app/features/users/enums/role.enum';
import { dateToString } from 'src/app/utils/date';
import * as ProjectActions from '../../state/projects.actions';
import { Project } from '../../models/project.model';
import { selectProject } from '../../state/projects.selectors';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  form: FormGroup;
  adminRole: Role = Role.ADMIN;
  projectId?: number;
  companyId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      start_date: [new Date(), Validators.required],
      end_date: [null],
      estimated_date: [null],
      active: [true],
    });

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
        this.form.patchValue(project);
      }
    });
  }

  private getProject(projectId: number): void {
    this.store.dispatch(ProjectActions.getProject({ payload: projectId }));
  }

  private createProject(project: Project): void {
    this.store.dispatch(ProjectActions.createProject({ payload: project }));
  }

  private updateProject(project: Project): void {
    this.store.dispatch(ProjectActions.updateProject({ payload: project }));
  }

  submit(): void {
    let value = {
      ...this.form.value,
      company_id: this.companyId,
      start_date: dateToString(this.form.value.start_date),
      end_date: dateToString(this.form.value.end_date),
      estimated_date: dateToString(this.form.value.estimated_date),
    };

    if (this.projectId) {
      value = { ...value, id: this.projectId };
      this.updateProject(value);
    } else {
      this.createProject(value);
    }
  }

  openDialog(): void {}
}
