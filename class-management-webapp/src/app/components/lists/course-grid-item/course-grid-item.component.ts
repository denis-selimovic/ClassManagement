import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../services/course/course.service';

@Component({
  selector: 'app-course-grid-item',
  templateUrl: './course-grid-item.component.html',
  styleUrls: ['./course-grid-item.component.css']
})
export class CourseGridItemComponent implements OnInit {

  @Input() course: Course;
  @Input() button: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getRating(): number {
    if (this.course.rating.count === 0) {
      return 0;
    }
    return this.course.rating.total / this.course.rating.count;
  }
}
