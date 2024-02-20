import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import * as TimeTrackingActions from './../../state/time-tracking.actions';
import { User } from 'src/app/features/users/models/user.model';
import { ITimeEntry, TimeEntry } from '../../models/time-entry.model';
import { timeValidator } from 'src/app/shared/validators/time.validator';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrl: './add-entry-dialog.component.scss',
})
export class AddEntryDialogComponent {
  dialogTitle: string = 'Add Entry';
  form: FormGroup;
  //TODO: Change colors
  colors: any[] = [
    { name: 'Green', value: '#0c963c' },
    { name: 'Red', value: '#f35221' },
    { name: 'Yellow', value: '#cfbd1a' },
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: string;
      user: User;
      entry: TimeEntry;
      period: { start: string; end: string };
    },
    private store: Store,
    private dialogRef: MatDialogRef<AddEntryDialogComponent>
  ) {
    this.form = this.fb.group(
      {
        title: ['', Validators.required],
        start_time: [this.data.period.start, Validators.required],
        end_time: [this.data.period.end, Validators.required],
        color: ['#0c963c', Validators.required],
        notes: [''],
      },
      { validators: [timeValidator] }
    );

    if (this.data.entry) {
      this.dialogTitle = 'Edit Entry';
      this.form.patchValue(this.data.entry);
    }
  }

  submit(): void {
    if (this.form.valid) {
      const dayEntry = {
        ...this.form.value,
        date: this.data.date,
        user_id: this.data.user.id,
        company_id: this.data.user.company_id,
        id: this.data.entry?.id,
      };

      if (this.data.entry) {
        this.updateEntry(dayEntry);
      } else {
        this.createEntry(dayEntry);
      }
    }
  }

  private createEntry(payload: ITimeEntry): void {
    this.store.dispatch(TimeTrackingActions.createTimeEntry({ payload }));
  }

  private updateEntry(payload: ITimeEntry): void {
    this.store.dispatch(TimeTrackingActions.updateTimeEntry({ payload }));
  }

  /** Close dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
