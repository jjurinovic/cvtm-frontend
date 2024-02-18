import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { TimeEntry } from '../../models/time-entry.model';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/features/users/models/user.model';
import * as TimeTrackingActions from './../../state/time-tracking.actions';
import { selectDay } from '../../state/time-tracking.selectors';
import { DATE_FORMAT, MS_PER_MINUTE, getNowTime } from 'src/app/utils/date';
import { DayEntry } from '../../models/day-entry.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent implements AfterViewInit {
  now: moment.Moment = moment();
  totalMinutes: number = 0;
  interval: any;
  currentUser!: User;
  dateObj: Date = new Date();
  day?: DayEntry;

  items: TimeEntry[] = [];

  @ViewChild('timelineEl') timelineEl!: ElementRef;

  constructor(private dialog: MatDialog, private store: Store) {
    // set now
    this.setNow();

    // Select current user from
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.getTimeEntries();
      }
    });

    // Select day from store
    this.store.select(selectDay).subscribe((day) => {
      if (day) {
        this.items = [];
        this.day = day;

        this.day.entries.forEach((entry) => {
          this.items.push(new TimeEntry(entry));
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.setScroll();
    clearInterval(this.interval);
  }

  /** On date change in datepicekr */
  dateChange(): void {
    this.getTimeEntries();
  }

  /** Get date in format YYYY-MM-DD from Date object */
  getDate(): string {
    return moment(this.dateObj).format(DATE_FORMAT);
  }

  /** Set now and add red line for current time */
  private setNow(): void {
    this.totalMinutes = (this.now.hour() * 60 + this.now.minute()) * 2;
    this.interval = setInterval(() => {
      this.now = moment();
      this.totalMinutes = (this.now.hour() * 60 + this.now.minute()) * 2;
    }, 30000);
  }

  /** Set scroll of timeline */
  private setScroll(): void {
    setTimeout(() => {
      this.timelineEl.nativeElement.scrollTop = this.totalMinutes - 150;
    });
  }

  /** Open dialog */
  openDialog(period: { start: string; end: string }, entry?: TimeEntry): void {
    this.dialog.open(AddEntryDialogComponent, {
      data: {
        date: this.getDate(),
        user: this.currentUser,
        entry,
        period,
      },
    });
  }

  /** Reutrns start and end time based on current time.
   * End Time is now and Start time is hour before
   */
  private currentPeriod(): { start: string; end: string } {
    const end = getNowTime();
    const start = getNowTime(-60);
    return { start, end };
  }

  /** Open dialog for add new entry */
  addEntry(): void {
    this.openDialog(this.currentPeriod());
  }

  /** Open dialog for editing existing entry */
  editEntry(entry: TimeEntry): void {
    this.openDialog({ start: entry.start_time, end: entry.end_time }, entry);
  }

  /** Ger new day by given date */
  getTimeEntries(): void {
    this.store.dispatch(
      TimeTrackingActions.getTimeEntries({
        payload: { date: this.getDate(), user_id: this.currentUser.id },
      })
    );
  }
}
