import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SwalService } from '../../services/swal.service';
import { MethodsHttpService } from '../../services/methods-http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<any> {
  constructor(
    private methodsHttp: MethodsHttpService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private storage: StorageService,
    private active_route: ActivatedRoute
  ) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    this.spinner.show();
    interface IPermissionsAndRoles {
      last_version_frontend: {
        version: string;
        description: string;
      },
      my_permissions: string | string[];
    }
    return forkJoin(
      {
        permissionsRolesAndVersion: this.methodsHttp.methodGet<IPermissionsAndRoles>('user/permissions-roles'),
        preferences: this.methodsHttp.methodGet('user/preferences/ajax'),
        notifications: this.methodsHttp.methodGet('notifications/ajax'),
      }
    ).pipe(
      tap(res => {
        this.spinner.hide();
      }),
      catchError((err) => {
        console.log(err);
        SwalService.swalFire({ 
          position: 'center', 
          title: 'Error al cargar datos', 
          text: 'Recargué la pagina o vuelva a iniciar sesión, en caso de no funcionar contacte al administrador del sistema',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Recargar',
          showCancelButton: true,
          cancelButtonText: 'Cerrar sesión',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed){
            window.location.reload()
          } else {
            this.storage.logout();
          }
        })
        this.spinner.hide();
        // this.route.navigate(['/login']);
        return EMPTY;
      })
    );
  }
}
