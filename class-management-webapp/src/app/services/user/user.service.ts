import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Role {
  role: string;
}

export interface User {
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
    return this.http.post('http://localhost:3000/users/auth/login', { username, password });
  }

  register(username: string, password: string, name: string, surname: string, email: string): any {
    return this.http.post('http://localhost:3000/users/auth/register', { username, password, name, surname, email });
  }

  setUser(userData, token): void {
    const { username, name, surname, email } = userData;
    const roles: Role[] = userData.roles.map(r => {
      return { role: r.role };
    });
    this.user = { username, name, surname, email, token, roles };
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
}
