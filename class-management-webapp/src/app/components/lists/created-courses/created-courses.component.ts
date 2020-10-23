import { Component, OnInit } from '@angular/core';
import {Course, CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-created-courses',
  templateUrl: './created-courses.component.html',
  styleUrls: ['./created-courses.component.css']
})
export class CreatedCoursesComponent implements OnInit {

  courses: Array<Course>;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCreatedCourses().subscribe(courses => this.courses = courses);
  }

  checkEnrollment(course: Course): boolean {
    return this.courseService.isEnrolled(course);
  }
}
