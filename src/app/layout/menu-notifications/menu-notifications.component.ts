import { Component, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import Echo from 'laravel-echo';
import { Subscription } from 'rxjs';
import { EchoManager } from '../../class/echo-manager';
import { LINK_IMAGE_LETTER, User } from '../../class/fast-data';
import { ItemDownload } from '../../core/components/download-file-status/download-file-status.component';
import { DownloadFileStatusService } from '../../core/services/download-file-status.service';
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
    private sdr: DownloadAndRedirectService,
    private sdfs: DownloadFileStatusService
  ) { }
  // showSpinner = true;
  countUnread: number;
  notifications: Notification[] = [];
  // percentSpinner: {percent: number} = {percent: 0};

  echo: Echo;
  imageLetterLink = LINK_IMAGE_LETTER;

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

  download(index): void {
    const notification = this.notifications[index];
    const itemDownload: ItemDownload = {
      content: 'Descargando archivo',
      url: notification.data.url,
      name: 'Archivo',
      title: notification.data.title,
      id: index
    }
    this.sdfs.addDownload(itemDownload);
  }

  notificationAction(index: number): void {
    const notification = this.notifications[index];
    if (notification.data?.url) {
      this.download(index);
      return;
    }
    if (notification.data?.route) {
      const route = notification.data.route;
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
