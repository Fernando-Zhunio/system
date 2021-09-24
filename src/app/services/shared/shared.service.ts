import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inotification } from '../../interfaces/inotification';
import { formatDate } from '@angular/common';
import { Iappointment, Irequest } from '../../interfaces/JobNovicompu/interfaces-jobNovicompu';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import  Echo  from 'laravel-echo';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  public urlServer = environment.server;
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

  constructor(private Http: HttpClient, private s_storage: StorageService) { }

  private notifications = new BehaviorSubject<Inotification[]>([]);
  public currentNotifications = this.notifications.asObservable();
  private _requestWork: Irequest = null;
  private _appointmentWork: Iappointment = null;
  private port = 80;
  public endpoint = environment.server;
  public domain_serve = environment.domain_serve;
  private echo_ = new Echo({
    broadcaster: 'pusher',
    cluster: 'mt1',
    key: environment.keySocket,
    authEndpoint: this.endpoint + 'broadcasting/auth',
    wsHost: this.domain_serve,
    disableStats: true,
    encrypted: false,
    wsPort: this.port,
    wssPort: this.port,
    enabledTransports: ['ws', 'wss'],
    forceTLS: false,
    auth: {
      headers: {
        Authorization: 'Bearer ' + this.s_storage.getCurrentToken()
      },
    },
  });

  public get echo() {
    return this.echo_;
  }

  public set echo(echo) {
    this.echo_ = echo;
  }


  // tslint:disable-next-line: member-ordering
  public static convertDateForLaravelOfDataPicker(valueDate, format= 'yyyy/MM/dd'): string {
    return formatDate(new Date(valueDate), format, 'en');
  }

  public static rediredImageNull(image: string): string {
    if (image === null) {
      return 'assets/img/img_not_available.png';
    }
    return image;
  }

  changeNotifications(notify: Inotification[]) {
    this.notifications.next(notify);
  }

  addNotification(notify: Inotification) {
    const notifications_ = this.notifications.value;
    notifications_.unshift(notify);
    this.changeNotifications(notifications_);
  }

  download(name, url) {
    return this.Http.get(this.urlServer + url, {
        responseType: 'blob',
      });
  }
}
