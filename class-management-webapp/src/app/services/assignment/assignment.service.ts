import { Injectable } from '@angular/core';
import { Assignment } from '../course/course.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadMyAssignments(): any {
    return this.http.get('http://localhost:3000/users/my-assignments', {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }
}
