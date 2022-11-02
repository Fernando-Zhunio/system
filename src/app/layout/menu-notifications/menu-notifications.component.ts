import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import Echo from 'laravel-echo';
import { Subscription } from 'rxjs';
import { EchoManager } from '../../class/echo-manager';
import { User } from '../../class/fast-data';
import { ADD_NOTIFICATIONS, NOTIFICATIONS_CREATE_POPUP, SET_NOTIFICATIONS } from '../../redux/notifications/actions/notifications.action';
import { MethodsHttpService } from '../../services/methods-http.service';
import { SharedService } from '../../services/shared/shared.service';
import { Notification } from '../../shared/interfaces/notification';
import { CONST_ECHO_NOTIFICATION_CHANNEL_PRIVATE } from '../../shared/objects/constants';
import { DownloadAndRedirectService } from '../../shared/services/download.service';

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
  echo: Echo;

  ngOnInit() {
    this.getNotification();
    this.notificationSubscription = this.actions
      .pipe(ofType(ADD_NOTIFICATIONS))
      .subscribe(({ notification }) => {
        this.countUnread++
        this.notifications.unshift(notification);
      });
      this.suscribeNotifications();
  }

  ngOnDestroy() {
    this.notificationSubscription?.unsubscribe();
    this.echo?.leave(this.getChannel());
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

  unreadNotifications() {
    SharedService.disabled_loader = true;
    this.countUnread = 0;
    this.methodsHttp.methodPost('notifications/mark-seen')
      .subscribe(() => { });
  }

  download(url: string): void {
    this.sdr.download(url);
  }

  notificationAction(url: string, route: string): void {
    if (url) {
      this.download(url);
      return;
    }
    if (route) {
      this.sdr.redirectTo(route);
    }
  }

  getChannel(): string {
    return CONST_ECHO_NOTIFICATION_CHANNEL_PRIVATE(User.getInstance().id);
  }

  suscribeNotifications(): void {
    this.echo = new EchoManager().get();
    this.echo
      .private(this.getChannel())
      .notification((notify: Notification) => {
        this.store.dispatch(NOTIFICATIONS_CREATE_POPUP({ notification: notify }));
        // if (notify.type == 'App\\Notifications\\NotificationPrice') {
        //   this.store.dispatch(generatePrice({ data: notify.data }));
        // }
        // if (notify.type === 'App\\Notifications\\ErrorPriceNotification') {
        //   this.store.dispatch(idlePrice());
        // }
        // if (this.countNotificationUnRead) {
        //   this.countNotificationUnRead = this.countNotificationUnRead + 1;
        // }
      });
  }

}
