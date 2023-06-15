import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let token: string = sessionStorage.getItem('token') as string;
    // let max_time = new Date(sessionStorage.getItem('max_time') as string);
    // let now = new Date();
    // if (token == null || (max_time.getTime() - now.getTime() <= 0)) {
    //   sessionStorage.clear();
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    return true;
  }
}
