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
export class AuthReverseGuard implements CanActivate {

  constructor(private route:Router,private s_storage:StorageService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if(this.s_storage.isAuthenticated()){
      this.route.navigate(['/home/inicio']);
      return false;
    }
    return true;
  }
}
