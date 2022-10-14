import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';
import { StorageService } from '../services/storage.service';
import { SharedService } from '../services/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from '../class/fast-data';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private s_storage: StorageService,
    private snackBar: MatSnackBar,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = new HttpHeaders();
    const isAuthenticated = this.s_storage.isAuthenticated();
    if (isAuthenticated) {
      headers = this.createHeader();
    }
    if (SharedService.disabled_loader) {
      SharedService.disabled_loader = false;
    } else {
      this.snackBar.open('Espere un momento...');
    }

    const newRequest = request.clone({ headers });

    return next.handle(newRequest).pipe(
      finalize(() => {
        this.snackBar.dismiss();
      }),
      catchError((err) => {
        this.snackBar.dismiss();
        let message: string = '';
        message = err?.error?.hasOwnProperty('success') ? err.error.data : 'Error de servidor';
        if (err.status === 401 || err.status === 403) { message= 'No autenticado'; this.s_storage.logout(); }
        SwalService.swalToast(message, 'warning')
        return throwError(err);
      })
    );
  }

  // hasInternet(): boolean {
  //   const condition = navigator.onLine ? 'online' : 'offline';
  //   if (condition === 'offline') {
  //     SwalService.swalFire({ allowOutsideClick: false, showConfirmButton: true, confirmButtonText: 'Recargar pagina', title: 'No hay conexion a internet', text: 'Por favor revise su conexion a internet', icon: 'warning' })
  //       .then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
  //       }
  //     });
  //     return false;
  //   }
  //   return true;
  // }

  createHeader() {
    const header = new HttpHeaders({
      accept: 'application/json',
      Authorization: 'Bearer ' + Token.getToken,
    });
    return header;
  }
}
