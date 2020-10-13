import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService, User } from '../user/user.service';

export interface Rating {
  total: number;
  count: number;
}

export interface Course {
  _id: any;
  name: string;
  description: string;
  owner: string;
  rating: Rating;
  students: any;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private userService: UserService) { }

  loadCourses(): any {
    return this.http.get('http://localhost:3000/courses');
  }

  loadCoursesByName(name: string): any {
    return this.http.get('http://localhost:3000/courses?name=' + name);
  }

  loadMyCourses(): any {
    return this.http.get('http://localhost:3000/users/my-courses', {
      headers: {
        Authorization: this.userService.getToken()
      }
    });
  }

  isEnrolled(course: Course): boolean {
    return course.students.includes(this.userService.getUser()._id);
  }
}
