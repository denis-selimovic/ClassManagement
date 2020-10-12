import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../../../services/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Array<Course> = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCourses().subscribe(courses => {
      courses.forEach(c => {
        this.courses.push({name: c.name, description: c.description, owner: c.owner});
      });
      console.log(this.courses);
    });
  }

}
