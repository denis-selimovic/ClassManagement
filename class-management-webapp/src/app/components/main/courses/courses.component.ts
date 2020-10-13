import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Array<Course>;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCourses().subscribe(courses => this.courses = courses);
  }


  checkEnrollment(course: Course): boolean {
    return this.courseService.isEnrolled(course);
  }
}
