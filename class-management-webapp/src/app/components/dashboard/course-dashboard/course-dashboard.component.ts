import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course, CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {

  course: Course;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.courseService.loadCourseById(id).subscribe(course => this.course = course);
    });
  }

}
