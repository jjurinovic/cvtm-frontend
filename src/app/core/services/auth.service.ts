import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Role } from 'src/app/features/users/enums/role.enum';

interface CustomJwtPayload extends JwtPayload {
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private role!: Role;

  BASE_URL = 'http://localhost:8000/';

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(username: string, password: string): Observable<any> {
    // remove token to not get errors
    this.removeToken();

    // create form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(this.BASE_URL + 'login', formData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public getRole(): Role {
    if (!this.role) {
      const decoded = jwtDecode<CustomJwtPayload>(this.getToken() as string);
      this.role = decoded.role;
    }
    return this.role;
  }
}
