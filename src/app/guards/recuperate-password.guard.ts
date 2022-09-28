import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';
import { catchError, map } from 'rxjs/operators';
import { PATH_LOGIN } from '../class/fast-data';
// import {  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecuperatePasswordGuard implements  Resolve<Iresponse> {
  constructor(
    private s_standart: StandartSearchService,
    private route: Router,
  ) {}

  resolve(router: ActivatedRouteSnapshot, _state: RouterStateSnapshot): any | Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    const token = router.queryParams['token'];
    const email = router.queryParams['email'];
    return this.s_standart.show(`auth/password/reset/${token}?email=${email}`).pipe(
      map((res) => {
        if (res?.success) {
          return {success: true, data: {email, token, res}};
        } else return EMPTY;
      }),
      catchError(() => {
        this.route.navigate([PATH_LOGIN]);
        return EMPTY;
      })
    );
  }
}
