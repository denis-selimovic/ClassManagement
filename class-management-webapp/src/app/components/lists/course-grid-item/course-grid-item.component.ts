import {Component, Input, OnInit} from '@angular/core';
import {Course, CourseService} from '../../../services/course/course.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-course-grid-item',
  templateUrl: './course-grid-item.component.html',
  styleUrls: ['./course-grid-item.component.css']
})
export class CourseGridItemComponent implements OnInit {

  @Input() course: Course;
  @Input() button: boolean;

  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
  }

  getRating(): number {
    if (this.course.rating.count === 0) {
      return 0;
    }
    return this.course.rating.total / this.course.rating.count;
  }

  enroll(): void {
    this.courseService.enroll(this.course._id).subscribe(course => {
      this.button = !this.button;
    }, error => {
    });
  }

  withdraw(): void {
    this.courseService.withdraw(this.course._id).subscribe(course => {
      this.button = !this.button;
    }, error => {
    });
  }

  checkEnrolled(): boolean {
    return this.button || this.course.owner === this.userService.getUser()._id;
  }

  checkWithdraw(): boolean {
    return !this.button || this.course.owner === this.userService.getUser()._id;
  }
}
