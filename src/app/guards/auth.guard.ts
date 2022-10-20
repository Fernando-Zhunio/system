import { Injectable } from "@angular/core";
import {
  CanActivate,
  // ActivatedRouteSnapshot,
  // RouterStateSnapshot,
  UrlTree,
  // Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
// import { PATH_LOGIN } from "../class/fast-data";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor( private sa: AuthService, private ss: StorageService ) {}
  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.ss.isAuthenticated()) {
      return true;
    }
    this.sa.logout();
    return false;
  }
}
