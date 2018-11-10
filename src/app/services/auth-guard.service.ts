import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    // console.log('can activate is working');

    if (this.authService.isLoggedIn()) {
      return true;
    }
    // let set the query parameters parameter(s) and add returnUrl to naviate back to the action
    this.router.navigate(['./login'], { queryParams: { returnUrl: state.url}});
    return false;

  }
}
