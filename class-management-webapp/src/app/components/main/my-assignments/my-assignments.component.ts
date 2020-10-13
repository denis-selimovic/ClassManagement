import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../../services/assignment/assignment.service';
import { Assignment } from '../../../services/course/course.service';

@Component({
  selector: 'app-my-assignments',
  templateUrl: './my-assignments.component.html',
  styleUrls: ['./my-assignments.component.css']
})
export class MyAssignmentsComponent implements OnInit {

  courses: any = {};
  assignments: Array<Assignment> = [];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.assignmentService.loadMyAssignments().subscribe(courses => {
      courses.forEach(c => {
        c.assignments.forEach(a => this.assignments.push(a));
        this.courses[c._id] = c;
      });
      console.log(this.courses);
    });
  }

}
