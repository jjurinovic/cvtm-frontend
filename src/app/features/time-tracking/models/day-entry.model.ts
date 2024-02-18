import { ITimeEntry, TimeEntry } from './time-entry.model';

export interface DayEntry {
  date: string;
  entries: ITimeEntry[];
  total: number;
}
