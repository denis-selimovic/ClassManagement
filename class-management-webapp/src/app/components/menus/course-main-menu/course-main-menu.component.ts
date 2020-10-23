import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../services/course/course.service';

@Component({
  selector: 'app-course-main-menu',
  templateUrl: './course-main-menu.component.html',
  styleUrls: ['./course-main-menu.component.css']
})
export class CourseMainMenuComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
    console.log(this.course);
  }

}
