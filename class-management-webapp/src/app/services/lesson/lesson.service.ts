import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient, private userService: UserService) { }

  create(id: string, name: string, description: string): any {
    return this.http.post(`${environment.api}/${id}/lesson`, { name, description }, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }
}
