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

  /**
   *
   * @param title
   * @param text
   * @param icon
   * @param confirmTexBtnt
   * @param cancelTextBtn
   * @returns retorna una promesa con isConfirmed como boolean
   */
  public static swalConfirmation(title,text,icon="success",confirmTexBtnt="Si, deseo eliminar",cancelTextBtn="No, deseo eliminar"):Promise<any>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-1',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
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
   const title_html =`<div class="d-flex font-weight-bold">${title}</div>`;

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
      title: title_html,
      customClass: {
        // container: "p-2",
        popup: "p-2"}
    });
  }

  public static swalToastNotification(title,icon="info",url_img=null,position="top-end"){
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,

      customClass: {
        // container: "p-2",
        popup: `p-2 bg-${icon}`,
        image: "m-0 rounded-fz",
      },

      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    let fire:any={};
    fire.title =`<div style="max-width: 200px;line-height: 1.5;" class="font-xs font-weight-light">${title}</div>` ;
    if(url_img){
      fire.imageUrl = url_img;
      fire.imageWidth= '50px';
      fire.imageHeight= '50px';
    }
    else fire.icon = icon;
    console.log(fire);
    Toast.fire(fire);
  }
}
