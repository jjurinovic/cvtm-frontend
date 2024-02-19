import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TimeEntry } from '../../models/time-entry.model';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrl: './time-entry.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeEntryComponent {
  @Input() timeEntry!: TimeEntry;
  @Output() onEdit: EventEmitter<TimeEntry> = new EventEmitter();
  @Output() onDelete: EventEmitter<TimeEntry> = new EventEmitter();

  editEntry(): void {
    this.onEdit.emit(this.timeEntry);
  }

  deleteEntry(): void {
    this.onDelete.emit(this.timeEntry);
  }
}
