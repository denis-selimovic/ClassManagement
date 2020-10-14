import { Injectable } from '@angular/core';
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

  loadUpload(id: string, uploadId: string): any {
    return this.http.get('http://localhost:3000/assignments/' + id + '/upload/' + uploadId, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }
}
