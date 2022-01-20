import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inotification } from '../../interfaces/inotification';
import { formatDate } from '@angular/common';
import { Iappointment, Irequest } from '../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { StorageService } from '../storage.service';


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

  public static disabled_loader: boolean = false;

  public get appointmentWork(): Iappointment {
    return this._appointmentWork;
  }

  public set appointmentWork(appointmentWork: Iappointment) {
    this._appointmentWork = appointmentWork;
  }

  constructor(private Http: HttpClient, private s_storage: StorageService) { }

  public urlServer = environment.server;

  private notifications = new BehaviorSubject<Inotification[]>([]);
  public currentNotifications = this.notifications.asObservable();
  private _requestWork: Irequest = null;
  private _appointmentWork: Iappointment = null;

  public static dates_of_dashboard: { start_date: Date, end_date: Date } = null;


  // tslint:disable-next-line: member-ordering
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

  changeNotifications(notify: Inotification[]) {
    this.notifications.next(notify);
  }

  addNotification(notify: Inotification) {
    const notifications_ = this.notifications.value;
    notifications_.unshift(notify);
    this.changeNotifications(notifications_);
  }

  download(url) {
    return this.Http.get(this.urlServer + url, {
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
