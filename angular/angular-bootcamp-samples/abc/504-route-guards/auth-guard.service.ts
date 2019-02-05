import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('Checking user access to route...', route);

    if (this.authService.currentUserHasAccessTo(route)) {
      return true;
    } else {
      console.log('User does not have access to route -- redirecting...');
      // void tells tslint that we are intentionally ignoring a promise.
      void this.router.navigate(['/forbidden']);
      return false;
    }
  }
}
