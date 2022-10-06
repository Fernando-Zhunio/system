import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SwalService } from '../../services/swal.service';
import { MethodsHttpService } from '../../services/methods-http.service';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<any> {
  constructor(
    private methodsHttp: MethodsHttpService,
    private storage: StorageService,
  ) { }

  resolve(): Observable<any> | Promise<any> {
    return forkJoin(
      {
        permissionsRolesAndVersion: this.methodsHttp.methodGet('user/permissions-roles'),
        // preferences: this.methodsHttp.methodGet('user/preferences/ajax')
        // notifications: this.methodsHttp.methodGet('notifications/ajax'),
      }
    ).pipe(
      catchError(() => {
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
        return EMPTY;
      })
    );
  }
}
