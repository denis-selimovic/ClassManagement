import { Component, OnInit } from '@angular/core';
import { Course } from '../../../services/course/course.service';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {

  courses: Array<Course> = [];

  constructor() { }

  ngOnInit(): void {
  }

  loadCourses($event: Array<Course>): void {
    this.courses = $event;
  }
}
