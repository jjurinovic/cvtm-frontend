import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JwtPayload, jwtDecode } from 'jwt-decode';

import { Role } from 'src/app/features/users/enums/role.enum';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';

interface CustomJwtPayload extends JwtPayload {
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private role!: Role;

  private baseURl = environment.apiUrl;

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Login and return token and logged in user
   * @param username username/email for login
   * @param password password
   * @returns {Observable<AuthResponse>} Return observable with AuthResponse object
   */
  login(username: string, password: string): Observable<AuthResponse> {
    // remove token to not get errors
    this.removeToken();

    // create form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post<AuthResponse>(this.baseURl + '/login', formData);
  }

  getToken(): string | null {
    return localStorage.getItem('cvtm-token');
  }

  setToken(token: string): void {
    localStorage.setItem('cvtm-token', token);
  }

  removeToken(): void {
    localStorage.removeItem('cvtm-token');
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getRole(): Role {
    if (!this.role && this.role !== 0 && this.getToken()) {
      const decoded = jwtDecode<CustomJwtPayload>(this.getToken() as string);
      this.role = decoded.role;
    }

    return this.role;
  }
}
