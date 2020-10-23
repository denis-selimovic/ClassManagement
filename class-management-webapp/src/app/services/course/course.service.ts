import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService, User } from '../user/user.service';
import { environment } from '../../../environments/environment';

export interface Rating {
  total: number;
  count: number;
}

export interface Upload {
  mimetype: string;
  name: string;
  owner: string;
  uploadedBy: User;
  data: any;
  _id: any;
}

export interface Assignment {
  name: string;
  setup: Upload;
  uploads: Array<Upload>;
  owner: string;
  dueDate: Date;
  courseId: string;
  _id: any;
}

export interface Course {
  _id: any;
  name: string;
  description: string;
  owner: string;
  rating: Rating;
  students: any;
  assignments: any;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadCourses(): any {
    return this.http.get(`${environment.api}/courses`);
  }

  loadCoursesByName(name: string): any {
    return this.http.get(`${environment.api}/courses?name=${name}`);
  }

  loadMyCourses(): any {
    return this.http.get(`${environment.api}/users/my-courses`, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  enroll(id: string): any {
    return this.http.post(`${environment.api}/courses/enroll/${id}`, {}, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  withdraw(id: string): any {
    return this.http.post(`${environment.api}/courses/leave/${id}`, {}, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  create(name: string, description: string): any {
    return this.http.post(`${environment.api}/courses/create`, { name, description }, {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  isEnrolled(course: Course): boolean {
    return course.students.includes(this.userService.getUser()._id);
  }
}
