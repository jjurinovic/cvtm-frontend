import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TimeTrackingActions from './../../state/time-tracking.actions';
import { User } from 'src/app/features/users/models/user.model';
import { TimeEntry } from '../../models/time-entry.model';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrl: './add-entry-dialog.component.scss',
})
export class AddEntryDialogComponent {
  dialogTitle: string = 'Add Entry';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dayId: number;
      date: string;
      user: User;
      entry: TimeEntry;
      period: { start: string; end: string };
    },
    private store: Store,
    private dialogRef: MatDialogRef<AddEntryDialogComponent>
  ) {
    this.form = this.fb.group({
      startTime: [this.data.period.start, Validators.required],
      endTime: [this.data.period.end, Validators.required],
    });

    if (this.data.entry) {
      console.log(this.data.entry);
      this.dialogTitle = 'Edit Entry';
      this.form.patchValue(this.data.entry);
    }
  }

  submit(): void {
    const dayEntry = {
      day_id: this.data.dayId,
      start_time: this.form.get('startTime')?.value,
      end_time: this.form.get('endTime')?.value,
      title: 'Test',
      date: this.data.date,
      user_id: this.data.user.id,
    };

    if (this.data.dayId) {
      this.store.dispatch(
        TimeTrackingActions.createDayEntry({
          payload: dayEntry,
        })
      );
    } else {
      this.store.dispatch(
        TimeTrackingActions.createDay({
          payload: {
            date: this.data.date,
            user_id: this.data.user.id,
            company_id: this.data.user.company_id,
            entries: [dayEntry],
          },
        })
      );
    }
  }

  /** Close dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
