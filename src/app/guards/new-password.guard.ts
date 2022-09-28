import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PATH_LOGIN } from '../class/fast-data';
import { Iresponse } from '../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../services/standart-search.service';

@Injectable({
  providedIn: 'root',
})
export class NewPasswordGuard implements Resolve<Iresponse> {
  constructor(
    private s_standard: StandartSearchService,
    private route: Router  ) {}

  resolve(router: ActivatedRouteSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse>  {
    const token = router.queryParams['token'];
    return this.s_standard.show('user/authenticate?token=' + token).pipe(
      map((res) => {
        return res;
      }),
      catchError((err) => {
          console.log(err);
          this.route.navigate([PATH_LOGIN]);
          return EMPTY;
        })
        );
      }
}
