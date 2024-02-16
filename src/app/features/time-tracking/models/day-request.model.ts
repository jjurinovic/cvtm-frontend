import { DayEntry } from './day-entry.model';

export interface DayRequest {
  date?: string;
  user_id?: number;
  company_id?: number;
  start?: string;
  end?: string;
  entries?: DayEntry[];
}
