import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Course} from '../../../services/course/course.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  course: Course;

  constructor(private router: Router) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
  }

}
