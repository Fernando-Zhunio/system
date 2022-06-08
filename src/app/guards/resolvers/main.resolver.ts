import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY, forkJoin } from 'rxjs';
import { Iresponse } from '../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../services/standart-search.service';
import { catchError, map } from 'rxjs/operators';
// import {  } from 'rxjs/operators';
import { SwalService } from '../../services/swal.service';
import { MethodsHttpService } from '../../services/methods-http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<any> {
  constructor(
    private methodsHttp: MethodsHttpService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private active_route: ActivatedRoute
  ) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    // const skuId = router.queryParams.token;
    const skuId = router.paramMap.get('id');
    this.spinner.show();
    interface IPermissionsAndRoles {
      last_version_frontend: {
        version: string;
        description: string;
      },
      my_permissions: string | string[];
    }
    return forkJoin([
      {
        permissionsAndRoles: this.methodsHttp.methodGet<IPermissionsAndRoles>('user/permissions-roles'),
        preferences: this.methodsHttp.methodGet('user/preferences/ajax'),
        notifications: this.methodsHttp.methodGet('notifications/ajax'),
      }
    ]).pipe(
      catchError((err) => {
        console.log(err);
        SwalService.swalFire({ position: 'center', title: 'Error al cargar datos', text: 'Intente lo nuevo en unos minutos' })
        this.spinner.hide();
        // this.route.navigate(['/login']);
        return EMPTY;
      })
    )

    // return this.s_standart.show(`products-admin/vtex/price-vtex/create?id=${skuId}`).pipe(
    //   map((res) => {
    //     if (res && res.hasOwnProperty('success') && res.success) {
    //       return res;
    //     } else EMPTY;
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     SwalService.swalFire({position: 'center', title: 'Error al cargar datos', text: 'Intente lo nuevo en unos minutos'})

    //     this.route.navigate(['admin-products/vtex-products']);
    //     return EMPTY;
    //   })
    // );
  }
}
