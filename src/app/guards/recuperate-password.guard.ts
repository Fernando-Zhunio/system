import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';
import { catchError, map } from 'rxjs/operators';
// import {  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecuperatePasswordGuard implements  Resolve<Iresponse> {
  constructor(
    private s_standart: StandartSearchService,
    private route: Router,
    private active_route: ActivatedRoute
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    const token = router.queryParams.token;
    const email = router.queryParams.email;
    return this.s_standart.show(`auth/password/reset/${token}?email=${email}`).pipe(
      map((res) => {
        if (res && res.hasOwnProperty('success') && res.success) {
          return {success: true, data: {email, token, res}};
        } else EMPTY;
      }),
      catchError((err) => {
        console.log(err);
        this.route.navigate(['login']);
        return EMPTY;
      })
    );
  }
}
