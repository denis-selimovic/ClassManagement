import { Component, Input, OnInit } from '@angular/core';
import { Assignment, Course } from '../../../services/course/course.service';

@Component({
  selector: 'app-assignment-item',
  templateUrl: './assignment-item.component.html',
  styleUrls: ['./assignment-item.component.css']
})
export class AssignmentItemComponent implements OnInit {

  @Input() assignment: Assignment;
  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
