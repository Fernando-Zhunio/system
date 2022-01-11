import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCodeGuard implements Resolve<Iresponse> {
  constructor(private router:Router,private s_standart:StandartSearchService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    const token = route.params.token;
    return this.s_standart.show('auth/email-two-factor/' + token).pipe(
      map((res) => {
        console.log(res);
        if (res.success) {
          route.queryParams = null;
        }
        return res;
      }),
      catchError((res) => {
        console.log(res);
        this.router.navigate(['login']);
        return EMPTY;
      })
    );
  }



}
