export interface TimeModel {
  startTime: string;
  endTime: string;
  date: string;
}

export class TimeEntry implements TimeModel {
  id?: number;
  startTime: string;
  endTime: string;
  color: string;
  title: string;
  date: string;
  pause?: number;
  notes?: string;

  constructor(
    start: string,
    end: string,
    date: string,
    title: string,
    color: string,
    id?: number,
    pause?: number,
    notes?: string
  ) {
    this.id = id;

    const s = start.split(':');
    if (s.length === 3) {
      this.startTime = s[0] + ':' + s[1];
    } else {
      this.startTime = start;
    }

    const e = end.split(':');

    if (e.length === 3) {
      this.endTime = e[0] + ':' + e[1];
    } else {
      this.endTime = end;
    }

    this.color = color;
    this.title = title;
    this.date = date;
    (this.pause = pause), (this.notes = notes);
  }

  getStartHours(): number {
    return parseInt(this.startTime.split(':')[0]);
  }

  getStartMinutes(): number {
    return parseInt(this.startTime.split(':')[1]);
  }

  getEndHours(): number {
    return parseInt(this.endTime.split(':')[0]);
  }

  getEndMinutes(): number {
    return parseInt(this.endTime.split(':')[1]);
  }

  totalStartMinutes(): number {
    return this.getStartHours() * 60 + this.getStartMinutes();
  }

  totalEndMinutes(): number {
    return this.getEndHours() * 60 + this.getEndMinutes();
  }

  totalDurationMinutes(): number {
    return this.totalEndMinutes() - this.totalStartMinutes();
  }
}
