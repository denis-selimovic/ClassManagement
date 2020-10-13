import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../../services/course/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  myCourses: Array<Course> = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadMyCourses().subscribe(courses => {
      this.myCourses = courses;
    });
  }

}
