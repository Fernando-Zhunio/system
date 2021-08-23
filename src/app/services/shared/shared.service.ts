import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inotification } from '../../interfaces/inotification';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private notifications = new BehaviorSubject<Inotification[]>([]);
  public currentNotifications = this.notifications.asObservable();

  constructor() { }

  changeNotifications(notify: Inotification[]) {
    this.notifications.next(notify);
  }

  addNotification(notify:Inotification){
    const notifications_ = this.notifications.value;
    notifications_.unshift(notify);
    this.changeNotifications(notifications_);
  }

  public static convertDateForLaravelOfDataPicker(valueDate):string{
    return formatDate(new Date(valueDate),'yyyy/MM/dd','en');
    // let data_req = this.form_publish.value;
    // data_req.estimated_date_first = formatDate(new Date(data_req.estimated_date_first),'yyyy/MM/dd','en');
    // data_req.estimated_date_last = formatDate(new Date(data_req.estimated_date_last),'yyyy/MM/dd','en');
  }
}
