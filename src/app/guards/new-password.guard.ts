import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Resolve,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';

@Injectable({
  providedIn: 'root',
})
export class NewPasswordGuard implements Resolve<Iresponse> {
  constructor(
    private s_standart: StandartSearchService,
    private route: Router,
    private active_route: ActivatedRoute
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    const token = router.queryParams.token;
    return this.s_standart.show('user/authenticate?token=' + token).pipe(
      map((res) => {
        if (res.success) {
          router.queryParams = null;
           this.active_route.queryParams.subscribe((res) => {
          });
        }
        return res;
      }),
      catchError((err) => {
        console.log(err);
        this.route.navigate(['login']);
        return EMPTY;
      })
    );
  }
}
