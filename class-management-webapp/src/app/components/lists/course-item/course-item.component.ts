import {Component, Input, OnInit} from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() course: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getRate(): number {
    if (this.course.rating.count === 0) {
      return 0;
    }
    return this.course.rating.total / this.course.rating.count;
  }

  isReadOnly(): boolean {
    return this.userService.getUser() === null || this.userService.getUser() === undefined;
  }

  getEnroolment(): string {
    const num = this.course?.students?.length;
    return (num === 1)  ? `${num} student enrolled` : `${num} students enrolled`;
  }
}
