import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DayEntry } from '../models/day-entry.model';
import { TimeEntriesRequest } from '../models/time-entries-request.model';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  private baseUrl = environment.apiUrl + '/time-entry';

  constructor(private http: HttpClient) {}

  /**
   * Get time entries for specific date
   * @param {TimeEntriesRequest} req object with params
   * @returns {Observable} Returns observable with time entries for specific date
   */
  public getTimeEntries(req: TimeEntriesRequest): Observable<DayEntry> {
    let params = new HttpParams();
    params = params.set('date', req.date);

    if (!!req.user_id) {
      params = params.set('user_id', req.user_id);
    }

    if (!!req.company_id) {
      params = params.set('company_id', req.company_id);
    }

    return this.http.get<DayEntry>(this.baseUrl, { params });
  }

  /**
   * Create new day entry
   * @param {DayEntry} req day entry object for create
   * @returns {Observable<DayEntry>} Returns Observable with DayEntry object
   */
  public createDayEntry(req: DayEntry): Observable<DayEntry> {
    return this.http.post<DayEntry>(this.baseUrl + '/entry', req);
  }

  /**
   * Update time entry
   * @param {DayEntry} req day entry object for update
   * @returns {Observable<DayEntry>} Returns Observable with DayEntry object
   */
  public updateDayEntry(req: DayEntry): Observable<DayEntry> {
    return this.http.put<DayEntry>(this.baseUrl + '/entry', req);
  }
}
