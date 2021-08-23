import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Iresponse } from '../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../services/standart-search.service';
import { catchError, map } from 'rxjs/operators';
// import {  } from 'rxjs/operators';
import { SwalService } from './../../services/swal.service';

@Injectable({
  providedIn: 'root'
})
export class VtexPriceGuard implements  Resolve<Iresponse> {
  constructor(
    private s_standart: StandartSearchService,
    private route: Router,
    private active_route: ActivatedRoute
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    // const skuId = router.queryParams.token;
    const skuId = router.paramMap.get("id");

    // const email = router.queryParams.email;
    return this.s_standart.show(`products-admin/vtex/price-vtex/create?id=${skuId}`).pipe(
      map((res) => {
        console.log(res);
        if (res && res.hasOwnProperty('success') && res.success) {
          return res;
        }
        else EMPTY;
      }),
      catchError((res) => {
        console.log(res);
        SwalService.swalFire({position:'center',title:'Error al cargar datos',text:'Intente lo nuevo en unos minutos'})

        this.route.navigate(["admin-products/vtex-products"]);
        return EMPTY;
      })
    );
  }
}
