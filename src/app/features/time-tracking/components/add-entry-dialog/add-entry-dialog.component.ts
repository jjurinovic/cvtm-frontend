import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as TimeTrackingActions from './../../state/time-tracking.actions';
import { User } from 'src/app/features/users/models/user.model';
import { TimeEntry } from '../../models/time-entry.model';
import { DayEntry } from '../../models/day-entry.model';
import { DayRequest } from '../../models/day-request.model';

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
      title: ['', Validators.required],
      startTime: [this.data.period.start, Validators.required],
      endTime: [this.data.period.end, Validators.required],
      color: ['#0c963c', Validators.required],
    });

    if (this.data.entry) {
      this.dialogTitle = 'Edit Entry';
      this.form.patchValue(this.data.entry);
    }
  }

  submit(): void {
    const dayEntry = {
      day_id: this.data.dayId,
      start_time: this.form.get('startTime')?.value,
      end_time: this.form.get('endTime')?.value,
      title: this.form.get('title')?.value,
      color: this.form.get('color')?.value,
      date: this.data.date,
      user_id: this.data.user.id,
      id: this.data.entry.id,
    };

    if (this.data.dayId) {
      if (this.data.entry) {
        this.updateEntry(dayEntry);
      } else {
        this.createEntry(dayEntry);
      }
    } else {
      const payload = {
        date: this.data.date,
        user_id: this.data.user.id,
        company_id: this.data.user.company_id,
        entries: [dayEntry],
      };
      this.createDay(payload);
    }
  }

  private createDay(payload: DayRequest): void {
    this.store.dispatch(TimeTrackingActions.createDay({ payload }));
  }

  private createEntry(payload: DayEntry): void {
    this.store.dispatch(TimeTrackingActions.createDayEntry({ payload }));
  }

  private updateEntry(payload: DayEntry): void {
    this.store.dispatch(TimeTrackingActions.updateDayEntry({ payload }));
  }

  /** Close dialog */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
