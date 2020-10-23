import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  course: any;

  constructor(private router: Router, private userService: UserService) {
    this.course = this.router.getCurrentNavigation().extras.state.course;
  }

  ngOnInit(): void {
  }

  checkOwnership(): boolean {
    return this.course.owner === this.userService.getUser()._id;
  }
}
