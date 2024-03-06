import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Role } from 'src/app/features/users/enums/role.enum';
import { dateToString } from 'src/app/utils/date';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  form: FormGroup;
  adminRole: Role = Role.ADMIN;
  @Input({ required: true }) projectId?: number;
  @Input({ required: true }) companyId!: number;
  @Input({ required: true, alias: 'project' }) set project(
    project: Project | undefined
  ) {
    if (project) {
      this.form.patchValue(project);
    }
  }
  @Output() create: EventEmitter<Project> = new EventEmitter();
  @Output() update: EventEmitter<Project> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      start_date: [new Date(), Validators.required],
      end_date: [null],
      estimated_date: [null],
      active: [true],
    });
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
      this.update.emit(value);
    } else {
      this.create.emit(value);
    }
  }

  openDialog(): void {}
}
