import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { TimeEntry } from '../../models/time-entry.model';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { selectCurrentUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/features/users/models/user.model';
import * as TimeTrackingActions from './../../state/time-tracking.actions';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss',
})
export class DayComponent implements AfterViewInit {
  timeline: number[] = [];
  quarter: number[] = [];
  now: Date = new Date();
  totalMinutes: number = 0;
  interval: any;
  currentUser!: User;
  date!: string;

  items: TimeEntry[] = [
    new TimeEntry('8:00', '12:33', 'Project 1', 'red'),
    new TimeEntry('13:00', '14:33', 'Project 2', 'green'),
    new TimeEntry('15:00', '18:33', 'Project 3', 'blue'),
  ];

  @ViewChild('timelineEl') timelineEl!: ElementRef;

  constructor(private dialog: MatDialog, private store: Store) {
    // create timeline
    this.createTimeline();

    // set now
    this.setNow();

    // get today's date
    this.date = this.now.toISOString().split('T')[0];
    // Select current user from
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.getDay();
      }
    });
  }

  ngAfterViewInit(): void {
    this.setScroll();
    clearInterval(this.interval);
  }

  private setNow(): void {
    this.totalMinutes = (this.now.getHours() * 60 + this.now.getMinutes()) * 2;
    this.interval = setInterval(() => {
      this.now = new Date();
      this.totalMinutes =
        (this.now.getHours() * 60 + this.now.getMinutes()) * 2;
    }, 30000);
  }

  private createTimeline(): void {
    Array(24)
      .fill(null)
      .forEach((el, i) => {
        this.timeline.push(i);
      });

    Array(4)
      .fill(null)
      .forEach((el, i) => {
        this.quarter.push(i);
      });
  }

  private setScroll(): void {
    setTimeout(() => {
      this.timelineEl.nativeElement.scrollTop = this.totalMinutes - 150;
    });
  }

  getTime(h: number, q: number) {
    let qt: any = (q + 1) * 15;
    h = qt === 60 ? h + 1 : h;
    qt = qt === 60 ? '00' : qt;

    h = h == 24 ? 0 : h;

    return `${h}:${qt}`;
  }

  openDialog(): void {
    this.dialog.open(AddEntryDialogComponent, {
      data: { dayId: 1, date: '14.02.2024' },
    });
  }

  getDay(): void {
    this.store.dispatch(
      TimeTrackingActions.getDay({
        payload: { date: this.date, user_id: this.currentUser.id },
      })
    );
  }
}
