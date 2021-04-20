import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, take, tap } from "rxjs/operators";
import { SwalService } from "../services/swal.service";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarLoaderComponent } from "../components/snack-bar-loader/snack-bar-loader.component";

declare let Swal: any;

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(
    private route: Router,
    private s_storage: StorageService,
    private snack_bar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = null;
    if (this.s_storage.isAuthenticated()) {
      headers = this.createHeader();
    } else {
      headers = new HttpHeaders({
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      });
    }
    const newResquest = request.clone({ headers });

    // Swal({
    //   title: "Loading cars from data base",
    // });
    // Swal.showLoading();
    const swal = Swal.fire({
      // title: ,
      position: "bottom-end",
      toast: true,
      showConfirmButton: false,
      title: '<div class="d-flex font-weight-bold">Cargando <div style="display:block;margin:0 0 0 15px" class="swal2-loader d-block ml-2 mr-1"></div></div>',
      customClass: {
        // container: "p-2",
        popup: "p-2",
        // header: "p-2",
        // title: "p-2",
        // closeButton: "p-2",
        // icon: "p-2",
        // image: "p-2",
        // content: "p-2",
        // htmlContainer: "p-2",
        // input: "p-2",
        // inputLabel: "p-2",
        // validationMessage: "p-2",
        // actions: "p-2",
        // confirmButton: "p-2",
        // denyButton: "p-2",
        // cancelButton: "p-2",
        // loader: "p-2",
        // footer: "p-2.",
      },
      // timer:5000,
      // allowOutsideClick:false,
      // allowEnterKey:false,
      // onBeforeOpen: () => {
      //     Swal.showLoading()
      // },
    });

    return next.handle(newResquest).pipe(
      finalize(() => {
        // this.snack_bar.dismiss();
        swal.close();
      }),
      catchError((err) => {
        // this.snack_bar.dismiss();
        Swal.close();
        switch (err.status) {
          case 401:
            if (this.s_storage.isAuthenticated()) this.s_storage.logout();
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
          case 422:
            if (err.error.hasOwnProperty("success")) {
              SwalService.swalToast(err.error.data, "warning");
            } else {
              SwalService.swalToast(
                "Contenido improcesable codigo 422",
                "warning"
              );
            }
            break;
          case 404:
            SwalService.swalToast(
              "El servidor no pudo encontrar el contenido solicitado. 404",
              "warning"
            );
            break;
          case 500:
            SwalService.swalToast(
              "Error del servidor, intentalo otra vez,500",
              "warning"
            );
            break;

          default:
            if (err.error.hasOwnProperty("success")) {
              SwalService.swalToast(err.error.data, "warning");
            } else {
              SwalService.swalToast(
                "Ups! Ocurrio un problema intentalo de nuevo,code: 500",
                "warning"
              );
            }
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
      Authorization: "Bearer " + token,
    });
    return Header;
  }
}
