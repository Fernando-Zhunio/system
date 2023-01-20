import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PATH_LOGIN } from '../class/fast-data';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCodeGuard implements Resolve<Iresponse> {
  constructor(private router:Router,private s_standart:StandartSearchService){}
  resolve(route: ActivatedRouteSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    const token = route.params['token'];
    return this.s_standart.show('auth/email-two-factor/' + token).pipe(
      map((res) => {
        if (res?.success) {
          route.queryParams = {};
        }
        return res;
      }),
      catchError((error) => {
        console.error(error);
        this.router.navigate([PATH_LOGIN]);
        return EMPTY;
      })
    );
  }



}
