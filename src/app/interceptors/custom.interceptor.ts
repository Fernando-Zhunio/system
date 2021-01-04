import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SwalService } from "../services/swal.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private route:Router,private s_storage:StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = null;
    if (this.s_storage.isAuthenticated()) {
      headers = this.createHeader();
    } else {
      headers = new HttpHeaders({
        "accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      });
    }
    const newResquest = request.clone({
      headers,
    });

    return next.handle(newResquest).pipe(
      
      catchError((err) => {
        
        switch (err.status) {
          case 401:
            if(this.s_storage.isAuthenticated())this.s_storage.logout();
          // this.route.navigate(['/login'])

            SwalService.swalToast(
              "Error de credenciales comprueben que sean correctas",
              "warning"
            );
            break;
          case 403:
            SwalService.swalToast(
              "No posee los permisos necesarios para este contenido",
              "warning"
            );
            break;
          case 404:
            SwalService.swalToast("El servidor no pudo encontrar el contenido solicitado.", "warning");
            break;
          case 500:
            SwalService.swalToast("Error del servidor, intentolo otra vez", "warning");
            break;
          default:
            SwalService.swalToast("Error desconocido, intentolo otra vez", "warning");
            break;
        }
        return throwError(err);
      })
    );
  }

  createHeader() {
    const token = this.s_storage.getCurrentToken();
    const Header = new HttpHeaders({
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    });
    return Header;
  }
}
