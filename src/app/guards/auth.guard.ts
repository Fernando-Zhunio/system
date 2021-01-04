import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router, private s_storage: StorageService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if(localStorage.getItem('token')) return true;

    // this.route.navigate(['/login'])
    // return false;
    if (this.s_storage.isAuthenticated()) {
      return true;
    }
    this.route.navigate(["/login"]);
    return false;
  }
}
