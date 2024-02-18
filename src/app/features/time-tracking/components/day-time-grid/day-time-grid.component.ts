import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-day-time-grid',
  templateUrl: './day-time-grid.component.html',
  styleUrl: './day-time-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayTimeGridComponent {
  timeline: number[] = [];
  quarter: number[] = [];
  @Output() periodClick: EventEmitter<{ start: string; end: string }> =
    new EventEmitter();

  constructor() {
    this.createTimeline();
  }

  /** Create timeline with hours and minutes */
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

  getTime(h: number, q: number) {
    let qt: any = (q + 1) * 15;
    h = qt === 60 ? h + 1 : h;
    qt = qt === 60 ? '00' : qt;

    h = h == 24 ? 0 : h;

    return `${h}:${qt}`;
  }

  /** Open dialog on range where user clikced */
  quarterClick(h: number, m: number): void {
    const end = this.getTime(h, m);

    const startH = m === 0 ? h - 1 : h;
    const startM = m === 0 ? 3 : m - 1;
    const start = this.getTime(startH, startM);

    this.periodClick.emit({ start, end });
  }
}
