import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public token:string
  
    constructor(private router: Router) {}
 
    canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
      let url: string = state.url;
        if (localStorage.getItem('token') != null) {
            return true;
        }
        else{
        this.router.navigate(['']);
        return false;
        }
    }
}

