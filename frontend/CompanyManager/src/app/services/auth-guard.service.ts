import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.jwtoken)
      return true;

    this.router.navigateByUrl('');
    return false;
  }

//   checkLoggedIn(url: string): boolean {
//     if (this.authService.jwtoken)
//       return true;

    
//   }
}
