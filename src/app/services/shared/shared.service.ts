import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../../interfaces/inotification';
import { formatDate } from '@angular/common';
import { Iappointment, Irequest } from '../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { Iswal, SwalService } from '../swal.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public get requestWork() {
    return this._requestWork;
  }

  public set requestWork(userWork: Irequest) {
    this._requestWork = userWork;
  }

  public get appointmentWork(): Iappointment {
    return this._appointmentWork;
  }

  public set appointmentWork(appointmentWork: Iappointment) {
    this._appointmentWork = appointmentWork;
  }

  public static navItems = null;

  constructor(private Http: HttpClient) { }

  public static disabled_loader: boolean = false;

  public static dates_of_dashboard: { start_date: Date, end_date: Date } = null;

  public urlServer = environment.server;

  private notifications = new BehaviorSubject<INotification[]>([]);
  public currentNotifications = this.notifications.asObservable();
  private _requestWork: Irequest = null;
  private _appointmentWork: Iappointment = null;

  /**
   * Metodo agrupador de arrays
   * @param array array de clave y valor
   * @param key clave
   * @returns Objeto de clave y valor con array de agrupaciones
   */
  public static groupBy(array, key) {
    return array.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }


  /**
   * Metodo convertido de fechas de datepicker
   * @param valueDate valor de fecha de un date picker
   * @param format // formato de fecha por defecto es yyyy/MM/dd
   * @returns retorna una fecha en formato yyyy/MM/dd
   */
  public static convertDateForLaravelOfDataPicker(valueDate, format = 'yyyy/MM/dd'): string {
    return formatDate(new Date(valueDate), format, 'en');
  }

  public static rediredImageNull(image: string, url = 'assets/img/img_not_available.png'): string {
    if (!image) {
      return url;
    }
    return image;
  }


  /**
   *
   * @param event
   * @param callbackAssignBase64
   * @example callbackAssignBase64 =  callbackImg(e): void {
      console.log(e);
      this.imgBase64 = e.srcElement.result;
    }
   * @return
   */
  public static getBase64(event, callbackAssignBase64): any {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = callbackAssignBase64; /*  {
     return  reader.result;
      console.log(reader.result);
    }; */
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  public static scrollBottom() {
    try {
      const element = document.getElementsByClassName('app-body')[0];
      element.scrollTop = element.scrollHeight - element.clientHeight;
    } catch (e) {
      console.log(e);
    }
  }

  static getParametersUrl(nameParam: string, actRouter: ActivatedRoute) {
    return actRouter.snapshot.paramMap.get(nameParam);
  }

  public static swalResponse(swalOption: Iswal, callbackSuccess: any, callbackNegative: any = null, callbackError: any = null) {
    SwalService.swalFire(
      swalOption,
    )
      .then(res => {
        if (res.isConfirmed) {
          callbackSuccess();
        } else {
          if (callbackNegative) {
            callbackNegative();
          }
        }
      }).catch(err => {
        if (err) {
          callbackError();
        }
      });
  }

  changeNotifications(notify: INotification[]) {
    this.notifications.next(notify);
  }

  addNotification(notify: INotification) {
    const notifications_ = this.notifications.value;
    notifications_.unshift(notify);
    this.changeNotifications(notifications_);
  }

  download(url, isFullPath = false) {
    const path = isFullPath ? url : this.urlServer + url;
    return this.Http.get(path, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    });
  }

  progressDownload(event: any, name_file: string, callback: any) {
    let progress = 0;
    switch (event.type) {
      case HttpEventType.Sent:
        break;
      case HttpEventType.ResponseHeader:
        break;
      case HttpEventType.DownloadProgress:
        progress = Math.round(event.loaded / event.total * 100);
        // this.progressDownloadReport = progress;
        callback(progress);

        break;
      case HttpEventType.Response:

        const blob = new Blob([event.body], { type: 'application/ms-Excel' });
        const urlDownload = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = urlDownload;
        a.download = name_file;
        a.click();
        window.URL.revokeObjectURL(urlDownload);
        a.remove();
        setTimeout(() => {
          // this.isProgressDownloadReport = false;
          // this.progressDownloadReport = 0;
          callback(0);
        }, 1500);
    }
  }




}
