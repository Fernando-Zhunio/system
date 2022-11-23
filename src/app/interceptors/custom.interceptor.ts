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
import { AuthService } from '../services/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private ss: StorageService,
    private snackBar: MatSnackBar,
    private sa: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: any = new HttpHeaders();
    const isAuthenticated = this.ss.isAuthenticated();
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
        if (err.status === 401 || err.status === 403) { this.sa.logout(); }
        const message = this.getStatusMessage(err.status, err.error?.message);
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
      Authorization: 'Bearer ' + Token.getInstance().getToken(),
    });
    return header;
  }

  getStatusMessage(status: number, message?: any) {
    const statusMessage = {
      400: 'Error de validación',
      401: 'No autenticado',
      403: 'No autorizado',
      404: 'Recurso no encontrado',
      500: 'Error interno de servidor',
      422: 'Error de validación',
    };
    if (status === 422 && typeof message === 'string') {
      return message;
    }
    else if (statusMessage.hasOwnProperty(status)) {
      return statusMessage[status] + ' (' + status + ')';
    }
    return 'Error de servidor';
  }
}
