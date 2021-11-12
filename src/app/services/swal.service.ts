import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Iswal {
  background?: string; // #fff
  grow?: 'row' | 'column' | 'fullscreen' | 'false';
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question';
  input?:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'tel'
    | 'range'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'url';
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
  showConfirmButton?: boolean;
  timer?: number;
  title?: string;
  width?: string;
  text?: string;
  html?: string;
}
declare let Swal: any;

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor(private route: Router) {}

  public static swalFire(
    // title,
    // icon = "success",
    // position:  "top-end",
    // timer = 1500
    iswal: Iswal = {
      title: 'Falta titulo',
      icon: 'success',
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
    }
  ) {
    Swal.fire(iswal);
  }

  /**
   *
   * @param title
   * @param text
   * @param icon
   * @param confirmTexBtnt
   * @param cancelTextBtn
   * @returns retorna una promesa con isConfirmed como boolean
   */
  public static swalConfirmation(
    title,
    text,
    icon = 'success',
    confirmTexBtnt = 'Si, deseo eliminar',
    cancelTextBtn = 'No, cancelar'
  ): Promise<{isConfirmed: boolean, dismiss: boolean}> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    return swalWithBootstrapButtons.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: confirmTexBtnt,
      cancelButtonText: cancelTextBtn,
      reverseButtons: false,
    });
  }

  public static swalFireWitButton(
    title,
    icon = 'success',
    position = 'top-end'
  ) {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: true,
    });
  }

  public static swalToast(title, icon = 'success', position = 'top-end',top=50) {
    const title_html = `<div class="d-flex font-weight-bold">${title}</div>`;

    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup:'mt-5'
      },

      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon,
      title: title_html,
      customClass: {
        // container: "p-2",
        popup: 'p-2',
      },
    });
  }

  public static swalToastNotification(
    router,
    name_user,
    title,
    icon = 'info',
    url_img = null,
    url,
    position = 'top-end',
    callback = null
  ) {
    if (icon === 'default') {icon = 'success'; }
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,

      customClass: {
        container: "p-2",
        popup: `p-2 bg-${icon} cursor-pointer`,
        image: 'm-0 rounded-fz',
      },

      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        toast.addEventListener('click', () => {
          if (callback) {
            callback(url);
          }
          // router.navigate([url]);
        });
      },
    });

    let fire: any = {};
    fire.title = `<div style="max-width: 200px;line-height: 1.5;" class="font-xs font-weight-light"><strong>${name_user}</strong><br>${title}</div>`;
    if (url_img) {
      fire.imageUrl = url_img;
      fire.imageWidth = '50px';
      fire.imageHeight = '50px';
    } else fire.icon = icon;
    Toast.fire(fire);
  }
}
