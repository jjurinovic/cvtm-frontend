import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { PageResponse } from 'src/app/shared/models/page-response';
import { PasswordChange } from '../models/password-change.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  /**
   * Return current logged in user
   * @returns {Observable<User>} Returns Observable with current user
   */
  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/me');
  }

  /**
   * Create new user and return it
   * @param {User} user user data for create
   * @returns {Observable<User>} Returns Observable with created user
   */
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  /**
   * Update existing user and returns it
   * @param {User} user user data for update
   * @returns {Observable<User>} Returns Observable with updated user
   */
  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl, user);
  }

  /**
   * Return user by given id
   * @param {number} id
   * @returns {Observable<User>} Returns Observable with user with given id
   */
  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/${id}`);
  }

  /**
   * Returns all user
   * @param {HttpParams} params pagination, search
   * @returns {Observable<PageResponse<User>>} Return Observable with page response with list of users
   */
  public getAll(
    companyId: number,
    page: number,
    size: number,
    sort?: string,
    sortField?: string,
    q?: string
  ): Observable<PageResponse<User>> {
    let params = new HttpParams();
    params = params.append('company_id', companyId);
    params = params.append('size', size);
    params = params.append('page', page);

    if (sort && sortField) {
      params = params.append('sort', sort);
      params = params.append('sort_field', sortField);
    }

    if (q) {
      params = params.append('q', q);
    }
    return this.http.get<PageResponse<User>>(this.baseUrl, { params });
  }

  /**
   * Change password
   * @param {PasswordChange} data old and new password
   * @returns {Observable<string>} Return string message
   */
  public changePassword(data: PasswordChange): Observable<string> {
    return this.http.put<string>(this.baseUrl + `/change-password`, data);
  }
}
