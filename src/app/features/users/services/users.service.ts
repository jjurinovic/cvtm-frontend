import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://localhost:8000/user/';

  constructor(private http: HttpClient) {}

  /**
   * Return current logged in user
   * @returns {Observable<User>} Returns Observable with current user
   */
  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'me');
  }
}
