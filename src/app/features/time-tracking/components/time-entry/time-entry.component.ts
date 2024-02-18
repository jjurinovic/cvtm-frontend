import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeEntry } from '../../models/time-entry.model';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrl: './time-entry.component.scss',
})
export class TimeEntryComponent {
  @Input() timeEntry!: TimeEntry;
  @Output() onEdit: EventEmitter<TimeEntry> = new EventEmitter();

  /** Open dialog for editing existing entry */
  editEntry(): void {
    this.onEdit.emit(this.timeEntry);
  }
}
