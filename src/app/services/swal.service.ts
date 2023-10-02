import { Injectable } from '@angular/core';

export interface Iswal {
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
  showCancelButton?: boolean;
  timer?: number;
  title?: string;
  width?: string;
  text?: string;
  html?: string;
  confirmButtonText?: string;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  cancelButtonText?: string;
}
declare let Swal: any;

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() { }

  /**
   *
   * @param allowEscapeKey  Si se establece en falso, el usuario no puede descartar la ventana emergente presionando la tecla Esc. También puede pasar una función personalizada que devuelva un valor booleano, p. si desea deshabilitar la tecla Esc para el estado de carga de una ventana emergente.
   *  @param allowOutsideClick Si se establece en false , el usuario no puede descartar la ventana emergente haciendo clic fuera de ella.
También puede pasar una función personalizada que devuelva un valor booleano, por ejemplo, si desea deshabilitar los clics externos para el estado de carga de una ventana emergente.
    * @param cancelButtonText Use esto para cambiar el texto en el botón "Denegar".
   * @returns
   */
  public static swalFire(
    iswal: Iswal = {
      title: 'Falta titulo',
      icon: 'success',
      position: 'top-end',
      timer: 1500,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }
  ): Promise<{ isConfirmed: boolean, isDenied: boolean }> {
    return Swal.fire(iswal);
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
  ): Promise<{ isConfirmed: boolean, dismiss: boolean }> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'px-3 py-2 bg-blue-500 !rounded-md text-white mr-2',
        cancelButton: 'px-3 py-2 bg-red-500 text-white',
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

  public static swalToast(title, icon = 'success', position = 'top-end') {
    const title_html = `<div class="d-flex font-weight-bold">${title}</div>`;

    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'mt-5'
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
        popup: 'p-2',
      },
    });
  }

  public static swalToastNotification(
    name_user,
    title,
    icon = 'info',
    url_img: any = null,
    url,
    position = 'top-end',
    callback: Function | null = null
  ) {
    if (icon === 'default') { icon = 'success'; }
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      showCloseButton: true,

      customClass: {
        container: 'p-2',
        popup: `p-2 bg-${icon} cursor-pointer`,
        image: 'm-0 rounded-fz',
        closeButton: 'text-white z-index-fix position-absolute',
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

    const fire: any = {};
    fire.title = `<div style="max-width: 200px;line-height: 1.5;" class="font-xs font-weight-light"><strong>${name_user}</strong><br>${title}</div>`;
    if (url_img) {
      fire.imageUrl = url_img;
      fire.imageWidth = '50px';
      fire.imageHeight = '50px';
    } else { fire.icon = icon; }
    Toast.fire(fire);
  }
}
