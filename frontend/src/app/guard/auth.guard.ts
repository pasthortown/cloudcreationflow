import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token: string = sessionStorage.getItem('token') as string;
    const token_data = this.getDecodedAccessToken(token);
    const max_time = new Date(token_data.valid_until);
    let now = new Date();
    if (token == null || (max_time.getTime() - now.getTime() <= 0)) {
      sessionStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
