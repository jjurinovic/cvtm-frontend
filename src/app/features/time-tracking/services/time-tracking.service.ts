import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Day } from '../models/day.model';
import { DayRequest } from '../models/day-request.model';
import { DayEntry } from '../models/day-entry.model';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackingService {
  private baseUrl = environment.apiUrl + '/day';

  constructor(private http: HttpClient) {}

  /**
   * Create new day for specific day and user
   * @param {DayRequest} req object with date and ids
   * @returns {Observable<Day>} Returns observable with day data
   */
  public createDay(req: DayRequest): Observable<Day> {
    return this.http.post<Day>(this.baseUrl, req);
  }

  /**
   * Get day data by given id
   * @param {number} id id of specific day
   * @returns {Observable} Returns observable with day data
   */
  public getDayById(id: number): Observable<Day> {
    return this.http.get<Day>(this.baseUrl + '/' + id);
  }

  /**
   * Return all days by given start and end date
   * @param {DayRequest} req object with params
   * @returns Returns observable with list of days
   */
  public getDays(req: DayRequest): Observable<Day[]> {
    let params = new HttpParams();
    params.set('user_id', req.user_id);
    params.set('company_id', req.company_id);

    if (req.start) {
      params.set('start', req.start);
    }

    if (req.end) {
      params.set('end', req.end);
    }
    return this.http.get<Day[]>(this.baseUrl, { params });
  }

  /**
   * Create new day entry
   * @param {DayEntry} req day entry object for create
   * @returns {Observable<DayEntry>} Returns Observable with DayEntry object
   */
  public createDayEntry(req: DayEntry): Observable<DayEntry> {
    return this.http.post<DayEntry>(this.baseUrl + '/entry', req);
  }
}
