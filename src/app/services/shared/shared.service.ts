import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inotification } from '../../interfaces/inotification';

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
}
