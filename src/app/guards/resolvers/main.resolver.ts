import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SwalService } from '../../services/swal.service';
import { MethodsHttpService } from '../../services/methods-http.service';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<any> {
  constructor(
    private methodsHttp: MethodsHttpService,
    private sa: AuthService,
  ) { }

  resolve(): Observable<any> | Promise<any> {
    return this.methodsHttp.methodGet('user/permissions-roles')
    .pipe(
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
            this.sa.logout();
          }
        })
        return EMPTY;
      })
    );
  }
}
