import { Component, Input } from '@angular/core';
import { Course } from '../../../services/course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {

  @Input() courses: Array<Course> = [];

  constructor() { }

}
