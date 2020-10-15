import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  loadSetup(id: string): any {
    return this.http.get('http://localhost:3000/assignments/' + id + '/setup', {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadAssignment(id: string): any {
    return this.http.get('http://localhost:3000/assignments/' + id, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  loadUploads(id: string): any {
    return this.http.get('http://localhost:3000/assignments/' + id + '/uploads', {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  upload(id: string, formData: FormData): any {
    return this.http.post('http://localhost:3000/assignments/' + id + '/upload', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Authorization: this.userService.getToken()
      })
    });
  }
}
