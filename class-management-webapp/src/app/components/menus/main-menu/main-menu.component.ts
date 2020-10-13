import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUsername(): string {
    // return this.userService.getUser().username + ' ' + this.userService.getUser().surname;
    return 'Denis Selimović';
  }
}
