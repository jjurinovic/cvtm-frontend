import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TimeEntry } from '../../models/time-entry.model';

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

  items: TimeEntry[] = [
    new TimeEntry('8:00', '12:33', 'Project 1', 'red'),
    new TimeEntry('13:00', '14:33', 'Project 2', 'green'),
    new TimeEntry('15:00', '18:33', 'Project 3', 'blue'),
  ];

  @ViewChild('timelineEl') timelineEl!: ElementRef;

  constructor() {
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
    this.totalMinutes = (this.now.getHours() * 60 + this.now.getMinutes()) * 2;
    this.interval = setInterval(() => {
      this.now = new Date();
      this.totalMinutes =
        (this.now.getHours() * 60 + this.now.getMinutes()) * 2;
    }, 30000);
  }

  ngAfterViewInit(): void {
    this.setScroll();
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
}
