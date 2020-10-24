import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.navigate(['my-courses'], { relativeTo: this.route });
  }

  getUsername(): string {
    return this.userService.getUser().username + ' ' + this.userService.getUser().surname;
  }

  isTutor(): boolean {
    return this.userService.isTutor();
  }

  tutor(): any {
    this.userService.tutor().subscribe(data => {
      this.userService.setUser(data, null);
    });
  }
}
