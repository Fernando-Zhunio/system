import { Injectable } from "@angular/core";

declare let Swal: any;
@Injectable({
  providedIn: "root",
})
export class SwalService {
  constructor() {}

  public static swalFire(
    title,
    icon = "success",
    position = "top-end",
    timer = 1500
  ) {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer,
    });
  }

  public static swalFireWitButton(
    title,
    icon = "success",
    position = "top-end"
  ) {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: true,
    });
  }

  public static swalToast( title, icon = "success",position = "top-end")
  {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon,
      title,
    });
  }
}
