import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../services/course/course.service';
import {UserService} from '../../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-course-main-menu',
  templateUrl: './course-main-menu.component.html',
  styleUrls: ['./course-main-menu.component.css']
})
export class CourseMainMenuComponent implements OnInit {

  @Input() course: Course;
  tutor: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.loadById(this.course.owner).subscribe(data => {
      this.tutor = data.tutor;
    });
  }

  getRating(): number {
    if (this.course.rating.count === 0) {
      return 0;
    }
    return this.course.rating.total / this.course.rating.count;
  }

  navigate(link: string): any {
    this.router.navigate([link], { relativeTo: this.route, state: { course: this.course } });
  }
}
