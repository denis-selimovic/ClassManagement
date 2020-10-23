import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../services/course/course.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  course: Course;
  id: any;

  constructor(private router: Router, private userService: UserService) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
  }

  checkOwnership(): boolean {
    return this.course.owner === this.userService.getUser()._id;
  }
}
