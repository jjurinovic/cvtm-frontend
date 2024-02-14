import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrl: './add-entry-dialog.component.scss',
})
export class AddEntryDialogComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { dayId: number; date: string }
  ) {
    console.log(data.date, data.dayId);
    this.form = this.fb.group({
      startTime: ['14:22', Validators.required],
      endTime: ['14:22', Validators.required],
    });
  }

  submit(): void {}

  onNoClick(): void {}
}
