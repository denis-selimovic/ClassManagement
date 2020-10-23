import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Role {
  role: string;
}

export interface User {
  _id: any;
  username: string;
  name: string;
  surname: string;
  email: string;
  token: string;
  roles: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    return this.http.post(`${environment.api}/users/auth/login`, { username, password });
  }

  register(username: string, password: string, name: string, surname: string, email: string): any {
    return this.http.post(`${environment.api}/users/auth/register`, { username, password, name, surname, email });
  }

  tutor(): any {
    return this.http.post(`${environment.api}/users/tutor`, {}, {
      headers: {
        Authorization: this.getToken()
      }
    });
  }

  setUser(userData, token): void {
    const { _id, username, name, surname, email } = userData;
    const roles: Role[] = userData.roles.map(r => {
      return { role: r.role };
    });
    if (!token) {
      token = this.getToken();
    }
    this.user = { _id, username, name, surname, email, token, roles };
  }

  clearUser(): void {
    this.user = null;
  }

  getUser(): User {
    return this.user;
  }

  getToken(): string {
    if (!this.user) {
      return '';
    }
    return 'Bearer ' + this.user.token;
  }

  isTutor(): boolean {
    return this.user.roles.map(r => r.role).includes('ROLE_TUTOR');
  }
}
