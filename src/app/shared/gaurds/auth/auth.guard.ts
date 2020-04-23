import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  CanActivateChild
} from '@angular/router';
import { AppData } from '../../services/app-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url === '/' && !AppData.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  constructor(public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      if (state.url === '/' && !AppData.isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  canLoad(route: Route) {
    if (AppData.isAuthenticated) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
