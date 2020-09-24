import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  failedLogin = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private route: ActivatedRoute) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('username').valueChanges.subscribe(value => this.failedLogin = false);
    this.loginForm.get('password').valueChanges.subscribe(value => this.failedLogin = false);
  }

  login(): void {
    this.userService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(body => {
      this.failedLogin = false;
      this.userService.setUser(body.user, body.token);
      this.route.queryParams.subscribe(queryParams => {
        if (queryParams.return) {
          this.router.navigate([queryParams.return]);
        }
        else {
          this.router.navigate(['dashboard']);
        }
      });
    }, error => {
      this.failedLogin = true;
    });
  }
}
