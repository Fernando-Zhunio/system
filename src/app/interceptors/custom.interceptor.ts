import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, take, tap } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';
import { StorageService } from '../services/storage.service';
import { SharedService } from '../services/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare let Swal: any;

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    // private route: Router,
    private s_storage: StorageService,
    public s_shared: SharedService,
    private snack_bar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.hasInternet()) {
      return;
    }
    
    let headers = null;
    // * si esta autenticado
    if (this.s_storage.isAuthenticated()) {
      headers = this.createHeader();
    } else {
      headers = new HttpHeaders({
        // accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
    }

    if  (SharedService.disabled_loader) {
      SharedService.disabled_loader = false;
    } else {
       // Activa spinner cargando
    //   swal = Swal.fire({
    //   position: 'bottom-end',
    //   toast: true,
    //   showConfirmButton: false,
    //   title: '<div class="d-flex">Cargando <div style="display:block;margin:0 0 0 15px" class="swal2-loader d-block ml-2 mr-1"></div></div>',
    //   customClass: {
    //     popup: 'p-2',
    //   },
    // });
    this.snack_bar.open('Espere un momento...');
    }

    const newResquest = request.clone({ headers });

    return next.handle(newResquest).pipe(
      finalize(() => {
        // if (swal) {swal.close(); }
        this.snack_bar.dismiss();
      }),
      catchError((err) => {
        console.log(err);
        this.snack_bar.dismiss();
        switch (err.status) {
          case 401:
            if (this.s_storage.isAuthenticated()) { this.s_storage.logout(); }
            SwalService.swalToast(
              'Error de credenciales comprueben que sean correctas',
              'warning'
            );
            break;
          case 403:
            SwalService.swalToast(
              'No posee los permisos necesarios para este contenido',
              'warning'
            );
            if (this.s_storage.isAuthenticated()) { this.s_storage.logout(); }
            break;
          case 422:
            if (err?.error.hasOwnProperty('success')) {
              SwalService.swalToast(err.error.data, 'warning');
            } else {
              SwalService.swalToast(
                'Contenido no valido codigo 422',
                'warning'
              );
            }
            break;
          case 404:
            SwalService.swalToast(
              'El servidor no pudo encontrar el contenido solicitado. 404',
              'warning'
            );
            break;
          case 500:
            SwalService.swalToast(
              'Error del servidor, intentalo otra vez,500',
              'warning'
            );
            break;

          default:
            if (err?.error.hasOwnProperty('success')) {
              SwalService.swalToast(err.error.data, 'warning');
            } else {
              SwalService.swalToast(
                'Ups! Ocurrio un problema intentalo de nuevo,codigo: 500',
                'warning'
              );
            }
            break;
        }
        return throwError(err);
      })
    );
  }

  hasInternet(): boolean {
    const condition = navigator.onLine ? 'online' : 'offline';
    // console.log(condition);
    if (condition === 'offline') {
      SwalService.swalFire({allowOutsideClick: false, showConfirmButton: true, confirmButtonText: 'Recargar pagina', title: 'No hay conexion a internet', text: 'Por favor revise su conexion a internet', icon: 'warning'}).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      return false;
      // throwError('No hay conexion a internet');
    }
    return true;
  }

  createHeader() {
    const token = this.s_storage.getCurrentToken();
    const Header = new HttpHeaders({
      accept: 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return Header;
  }
}
