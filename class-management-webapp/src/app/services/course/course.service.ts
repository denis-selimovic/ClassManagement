import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Rating {
  total: number;
  count: number;
}

export interface Course {
  name: string;
  description: string;
  owner: string;
  rating: Rating;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  loadCourses(): any {
    return this.http.get('http://localhost:3000/courses');
  }
}
