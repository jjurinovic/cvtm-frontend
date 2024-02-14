import { DayEntry } from './day-entry.model';

export interface Day {
  id: number;
  date: string;
  user_id: number;
  company_id: number;
  entries: DayEntry[];
}
