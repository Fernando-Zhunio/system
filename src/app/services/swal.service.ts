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

  public static swalToastNotification(title,url_img=null,icon="info",position="top-end"){
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


    let fire:any={};

    fire.title = title;


    // =
    // {
      // icon
      // ,
      // title,
      // imageUrl:url_img,
      // imageWidth:'100px',
      // imageHeight:'100px'
    // }
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
