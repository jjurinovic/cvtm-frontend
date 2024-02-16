export interface TimeModel {
  startTime: string;
  endTime: string;
  date: string;
}

export class TimeEntry implements TimeModel {
  startTime: string;
  endTime: string;
  color: string;
  title: string;
  date: string;

  constructor(
    start: string,
    end: string,
    date: string,
    title: string,
    color: string
  ) {
    this.startTime = start;
    this.endTime = end;
    this.color = color;
    this.title = title;
    this.date = date;
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
