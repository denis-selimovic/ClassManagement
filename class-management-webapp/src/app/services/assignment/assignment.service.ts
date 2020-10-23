import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadMyAssignments(): any {
    return this.http.get(`${environment.api}/users/my-assignments`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadCourseAssignments(id: string): any {
    return this.http.get(`${environment.api}/courses/${id}/assignments`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadSetup(id: string): any {
    return this.http.get(`${environment.api}/assignments/${id}/setup`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadAssignment(id: string): any {
    return this.http.get(`${environment.api}/assignments/${id}`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadUploads(id: string): any {
    return this.http.get(`${environment.api}/assignments/${id}/uploads`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  upload(id: string, formData: FormData): any {
    return this.http.post(`${environment.api}/assignments/${id}/upload`, formData, {
      headers: new HttpHeaders({
        Authorization: this.userService.getToken()
      })
    });
  }
}
