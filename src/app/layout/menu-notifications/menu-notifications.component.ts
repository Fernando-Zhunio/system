import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { INotification } from '../../interfaces/inotification';
import { ADD_NOTIFICATIONS, SET_NOTIFICATIONS } from '../../redux/notifications/actions/notifications.action';
// import { selectNotification } from '../../redux/state/state.selectors';
import { MethodsHttpService } from '../../services/methods-http.service';
import { SharedService } from '../../services/shared/shared.service';
import { DownloadAndRedirectService } from '../../shared/services/download.service';
// import { Notification } from '../../shared/interfaces/notification';

@Component({
  selector: 'app-menu-notifications',
  templateUrl: './menu-notifications.component.html',
  styleUrls: ['./menu-notifications.component.scss']
})
export class MenuNotificationsComponent implements OnInit, OnDestroy {

  notificationSubscription: Subscription;
  constructor(
    private methodsHttp: MethodsHttpService,
    private actions: ActionsSubject,
    private store: Store,
    private sdr: DownloadAndRedirectService
  ) { }
  showSpinner = true;
  countUnread: number;
  notifications: any[] = [];
  percentSpinner: {percent: number} = {percent: 0};
  ngOnInit() {
    this.getNotification();
    this.notificationSubscription = this.actions //this.store.select(selectNotification)
      .pipe(ofType(ADD_NOTIFICATIONS))
      .subscribe(({ notification }) => {
        this.countUnread++
        this.notifications.unshift(notification);
      });
  }

  getNotification(): void {
    this.methodsHttp.methodGet('notifications/ajax').subscribe((res: any) => {
      if (res?.success) {
        const notifications = res.data;
        this.notifications = [...res.data];
        this.store.dispatch(SET_NOTIFICATIONS({ notifications }));
        if (this.notifications.length > 0) {
          this.countUnread = this.notifications.filter((notification) => !notification.read_at).length;
        }
      }
    });
  }

  ngOnDestroy() {
    this.notificationSubscription?.unsubscribe();
  }

  unreadNotifications() {
    SharedService.disabled_loader = true;
    this.countUnread = 0;
    this.methodsHttp.methodPost('notifications/mark-seen')
      .subscribe(() => { });
  }

  download(url: string): void {
    this.sdr.download(url);
  }

  notificationAction(id: number): void {
    const notificationData = this.notifications.find((notification) => notification.id === id)?.data;
    if(!notificationData) return;

    if (notificationData.url) {
      this.download(notificationData.url);
      return;
    }
    if (notificationData?.route) {
      this.sdr.redirectTo(notificationData.route);
    }
  }

}
