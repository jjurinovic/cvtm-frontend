import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { DayEntry } from '../models/day-entry.model';
import { TimeEntriesRequest } from '../models/time-entries-request.model';
import { ITimeEntry } from '../models/time-entry.model';

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
   * @param {ITimeEntry} req day entry object for create
   * @returns {Observable<ITimeEntry>} Returns Observable with ITimeEntry object
   */
  public createTimeEntry(req: ITimeEntry): Observable<ITimeEntry> {
    return this.http.post<ITimeEntry>(this.baseUrl + '/entry', req);
  }

  /**
   * Update time entry
   * @param {ITimeEntry} req day entry object for update
   * @returns {Observable<ITimeEntry>} Returns Observable with ITimeEntry object
   */
  public updateTimeEntry(req: ITimeEntry): Observable<ITimeEntry> {
    return this.http.put<ITimeEntry>(this.baseUrl + '/entry', req);
  }

  /**
   * Delete time entry
   * @param {number} id id of item for delete
   * @returns Message for succesfully delete time entry
   */
  public deleteTimeEntry(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/entry/' + id);
  }
}
