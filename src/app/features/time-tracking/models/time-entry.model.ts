import { Project } from '../../projects/models/project.model';

export interface ITimeEntry {
  id?: number;
  start_time: string;
  end_time: string;
  color: string;
  title: string;
  date: string;
  pause?: number;
  notes?: string;
  user_id: number;
  company_id: number;
  project_id: number;
  project: Project;
}

export class TimeEntry implements ITimeEntry {
  id?: number;
  start_time: string;
  end_time: string;
  color: string;
  title: string;
  date: string;
  pause?: number;
  notes?: string;
  user_id: number;
  company_id: number;
  project_id: number;
  project: Project;

  constructor(timeEntry: ITimeEntry) {
    this.id = timeEntry.id;
    this.user_id = timeEntry.user_id;
    this.company_id = timeEntry.company_id;

    const start = timeEntry.start_time.split(':');
    this.start_time = start[0] + ':' + start[1];

    const end = timeEntry.end_time.split(':');
    this.end_time = end[0] + ':' + end[1];
    this.pause = timeEntry.pause;
    this.title = timeEntry.title;
    this.notes = timeEntry.notes;
    this.date = timeEntry.date;
    this.color = timeEntry.color;
    this.project = timeEntry.project;
    this.project_id = timeEntry.project_id;
  }

  getStartHours(): number {
    return parseInt(this.start_time.split(':')[0]);
  }

  getStartMinutes(): number {
    return parseInt(this.start_time.split(':')[1]);
  }

  getEndHours(): number {
    return parseInt(this.end_time.split(':')[0]);
  }

  getEndMinutes(): number {
    return parseInt(this.end_time.split(':')[1]);
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
