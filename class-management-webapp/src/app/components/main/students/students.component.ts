import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  course: any;

  constructor(private router: Router) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
  }

}
