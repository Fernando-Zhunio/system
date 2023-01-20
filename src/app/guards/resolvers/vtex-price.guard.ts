import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Iresponse } from '../../interfaces/Imports/invoice-item';
import { catchError } from 'rxjs/operators';
// import {  } from 'rxjs/operators';
import { SwalService } from './../../services/swal.service';
import { MethodsHttpService } from '../../services/methods-http.service';

@Injectable({
  providedIn: 'root'
})
export class VtexPriceGuard implements  Resolve<Iresponse> {
  constructor(
    private s_standart: MethodsHttpService,
    private route: Router,
  ) {}

  resolve(router: ActivatedRouteSnapshot): Iresponse | Observable<Iresponse> | Promise<Iresponse> {
    // const skuId = router.queryParams.token;
    const skuId = router.paramMap.get('id');

    // const email = router.queryParams.email;
    return this.s_standart.methodGet(`products-admin/vtex/price-vtex/create?id=${skuId}`)
    .pipe(
      catchError((err) => {
        console.error(err);
        SwalService.swalFire({position: 'center', title: 'Error al cargar datos', text: 'Intente lo nuevo en unos minutos'})
        this.route.navigate(['admin-products/vtex-products']);
        return EMPTY;
      })
    );
  }
}
