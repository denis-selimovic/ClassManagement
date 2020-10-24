import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.getUser()) {
      this.router.navigate(['login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
    return true;
  }
}
