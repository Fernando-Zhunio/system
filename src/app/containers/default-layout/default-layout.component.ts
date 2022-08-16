import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { INotification, INotificationData } from '../../interfaces/inotification';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared/shared.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInfoPersonModalComponent } from '../../components/modals/add-info-person-modal/add-info-person-modal.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { EchoManager } from '../../class/echo-manager';
import Echo from 'laravel-echo';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HttpEventType } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { ListPermissions } from '../../class/list-permissions';
import { Store } from '@ngrx/store';
import { addNotification, overrideNotification } from '../../redux/actions/notification.action';
import { selectNotification } from '../../redux/state/state.selectors';
import { generatePrice, idlePrice } from '../../redux/actions/price.action';
import { setPreference } from '../../redux/actions/preference.action';
import { compare } from 'compare-versions';
import { MethodsHttpService } from '../../services/methods-http.service';
import { TEST_PERMISSIONS } from '../../class/permissionsAll';
import { NotificationType } from '../../enums/notification.enum';
import { INavData } from '../../interfaces/inav-data';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.css'],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private s_auth: AuthService,
    private route: Router,
    private s_storage: StorageService,
    private methodsHttp: MethodsHttpService,
    public s_shared: SharedService,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    public sw_push: SwPush,
    private store: Store,
    private activatedRoute: ActivatedRoute,
  ) {
    this.notifications$ = this.store.select(selectNotification);
  }
  notifications$: Observable<INotification[]>;

  @HostBinding('class') componentCssClass;

  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  public url_img = '';
  public isDark: boolean = false;
  public hideUsersChat: boolean = false;
  public progressDownloadReport: number = 0;
  public isProgressDownloadReport: boolean = false;
  public isDownloadStock: boolean = false;

  countNotificationUnRead: number = null;
  notificationWeb: NotificationsWebPush = null;
  countMessages: any = null;
  echo: Echo;
  user: any;
  searchBar: ListPermissions;
  auxSearchPage: INavData[] = [];
  imgCompany: { size: string, url: string } = { size: '100%', url: 'assets/icons_custom/novisolutions.svg' };

  notificationType = {
    webpush: false,
    email: false
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ res }) => {
      this.getPermissionAndVersionServer(res.permissionsRolesAndVersion);
      this.getNotification(res.notifications); // in resolver
      this.setPreferences(res.preferences); // in resolver
    }).unsubscribe();
    this.loadUnreadCountMessages();
    this.setImgCompanies(); //not loaded in resolver
    this.hasDarkTheme(); //not loaded in resolver
    this.notificationWeb = new NotificationsWebPush(this.sw_push, this.methodsHttp); //not loaded in resolver
    // this.getPermissionAndVersionServerTest();
    this.notificationWeb.canInitSw(); //not loaded in resolver
    this.user = this.s_storage.getCurrentUser(); //not loaded in resolver
    if (!this.user.person) { this.addPersonModal(this.user); } //not loaded in resolver
    this.suscribeNotifications(this.user); // not loaded in resolver

  }

  ngOnDestroy(): void {
    this.echo.leave('App.Models.User.' + this.user.id);
  }

  goProfile(): void {
    this.route.navigate(['home/perfil']);
  }

  setImgCompanies(): void {
    this.imgCompany = window.innerWidth > 600 ? { size: '100%', url: 'assets/icons_custom/novisolutions.svg' } : { size: '30px', url: 'assets/icons_custom/icon-512x512.png' };
  }

  goPage(page): void {
    this.route.navigate([page]);
  }

  onSetTheme(e: MatSlideToggleChange | { checked: boolean }): void {
    const theme = e.checked ? 'dark-theme' : 'light-theme';
    localStorage.setItem('isDark', e.checked ? 'true' : 'false');
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    if (theme === 'dark-theme') {
      this.overlayContainer.getContainerElement().classList.remove('light-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('dark-theme');
    }
  }

  hasDarkTheme() {
    if (localStorage.getItem('isDark')) {
      this.onSetTheme({ checked: JSON.parse(localStorage.getItem('isDark')) });
      this.isDark = JSON.parse(localStorage.getItem('isDark'));
    }
  }

  addPersonModal(user): void {
    this.dialog.open(AddInfoPersonModalComponent, {
      data: { user },
      disableClose: true,
    }).beforeClosed()
      .subscribe((res) => {
        if (res == undefined) {
          this.addPersonModal(user);
        } else {
          const user_current = this.s_storage.getCurrentUser();
          user_current.person = res;
          this.s_storage.setCurrentUser(user_current);
        }
      });
  }

  newMessage(e): void {
    e ? this.countMessages++ : this.countMessages = null;
  }

  getNotification(res): void {
    if (res && res.hasOwnProperty('success') && res.success) {
      this.store.dispatch(overrideNotification({ notifications: res.data }));
      const notifications = res.data;
      //  Esta propiedad también viene en las notificaciones aun que se refiera a los mensajes no leídos de los chats */
      // this.countMessages = res.data.count_message_not_read_of_chat == 0 ? null : res.data.count_message_not_read_of_chat;
      if (notifications.length > 0) {
        // ? Si hay notificaciones sin leer */
        const countNotification = notifications.filter((notification) => !notification.read_at).length;
        this.countNotificationUnRead = countNotification > 0 ? countNotification : null;
      }
    }
  }

  loadUnreadCountMessages(): void {
    this.methodsHttp.methodGet('chats/chat/messages/count-unread').subscribe((res) => {
      this.countMessages = res.data == 0 ? null : res.data;
    })
  }

  openOrCloseChats(): void {
    this.hideUsersChat = !this.hideUsersChat;
    if (this.hideUsersChat) {
      this.countMessages = null;
    }
  }

  setPreferences(res): void {
    if (res && res.hasOwnProperty('success') && res.success) {
      this.notificationType.email = res.data[NotificationType.email] === 'on' ? true : false;
      this.notificationType.webpush = res.data[NotificationType.webpush] === 'on' ? true : false;
      this.store.dispatch(setPreference({ preference: res.data }));
    }

  }

  getPermissionAndVersionServer(res) {
    if (res?.success) {
      if (res.data?.last_version_frontend?.version) {
        this.validateVersion(res.data?.last_version_frontend?.version, res.data?.last_version_frontend?.description);
      }
      const permissions = res.data.my_permissions;
      const array_permissions = typeof permissions == 'string' && permissions == 'super-admin' ?
        [permissions] : permissions;
      this.s_storage.setPermission(array_permissions);
      this.navItems = this.auxSearchPage = res.data.item_sidebar;
      this.getTicketsUnread();

    }
  }

  searchPage(e): void {
    // console.log(e);
    this.navItems = this.auxSearchPage.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
  }

  getPermissionAndVersionServerTest() {
    this.methodsHttp.methodGet('user/permissions-roles').subscribe((res) => {
      if (res?.success) {
        if (res.data?.last_version_frontend?.version) {
          this.validateVersion(res.data?.last_version_frontend?.version, res.data?.last_version_frontend?.description);
        }
        const permissions = TEST_PERMISSIONS;
        const array_permissions = typeof permissions == 'string' && permissions == 'super-admin' ?
          [permissions] : permissions;
        this.s_storage.setPermission(array_permissions);
        this.navItems = res.data.item_sidebar;
        this.getTicketsUnread();
      }
    }, err => {
      console.log(err);
      SwalService.swalFire({ title: 'Error', text: 'Se necesita que recargué la pagina, si el error continua por favor póngase en contacto con el desarrollador del sistema' });
    });
  }

  validateVersion(latestVersion: string, message: string): void {
    try {
      const currentVersion = this.s_storage.getItemLocalStorage('version');
      if (currentVersion) {
        const isNewVersion = compare(currentVersion, latestVersion, '<'); // true
        if (isNewVersion) {
          SwalService.swalFire({ allowOutsideClick: false, showCancelButton: true, cancelButtonText: 'No, gracias', confirmButtonText: 'Si, actualizar', showConfirmButton: true, title: 'Actualización disponible', text: 'Hay una nueva versión de la aplicación, por favor actualice la aplicación, presione Ctrl + f5 \n' + message, icon: 'info' })
            .then((res) => {
              console.log(res);
              if (res.isConfirmed) {
                this.s_storage.setItemLocalStorage('version', latestVersion);
                console.log('Confirmado');
                location.reload();
              }
            }).catch(() => { });
        }
      } else {
        this.s_storage.setItemLocalStorage('version', latestVersion);
      }
    } catch (error) {
      console.log(error);
    }
  }

  suscribeNotifications(user): void {
    this.echo = new EchoManager(this.s_storage).echo;
    this.echo
      .private('App.Models.User.' + user.id)
      .notification((notify: INotification) => {
        this.store.dispatch(addNotification({ notification: notify }));
        if (notify.type == 'App\\Notifications\\NotificationPrice') {
          this.store.dispatch(generatePrice({ data: notify.data }));
        }
        if (notify.type === 'App\\Notifications\\ErrorPriceNotification') {
          this.store.dispatch(idlePrice());
        }
        const data_rendered = notify.data;
        let name_user = 'System';
        if (
          data_rendered.user.hasOwnProperty('person') &&
          data_rendered.user.person
        ) {
          name_user = `${data_rendered.user.person.first_name} ${data_rendered.user.person.last_name}`;
        } else {
          name_user = data_rendered.user.name;
        }
        this.countNotificationUnRead = this.countNotificationUnRead + 1;
        const url = data_rendered.route;
        SwalService.swalToastNotification(
          this.route,
          name_user,
          data_rendered.text,
          data_rendered.type,
          data_rendered.image,
          url,
          'top-end',
          this.goRouteNotification.bind(this)
        );
      });
  }

  calls = new Subject();

  unreadNotifications() {
    this.calls.next(true);
    SharedService.disabled_loader = true;
    this.methodsHttp.methodPost('notifications/mark-seen', {})
    .pipe(takeUntil(this.calls),)
    .subscribe((res) => {
      if (this.countNotificationUnRead > 0) {
        this.countNotificationUnRead = null;
      }
      if (res && res.hasOwnProperty('success') && res.success) {
      }
    });
  }

  goRouteNotification(notificationData: INotificationData): void {
    if (notificationData.url) {
      this.downloadStock(notificationData.url);
      return;
    }
    if (notificationData?.route) {
      const urlOutHash = notificationData.route.replace('#/', '');
      const url_object: any = new URL(urlOutHash);
      const path_name = url_object.pathname;
      console.log(this.route.url, path_name);
      const queryStrings = Array.from(url_object.searchParams.entries());
      const query_ = {};
      if (queryStrings.length > 0) {
        queryStrings.forEach((item) => {
          query_[item[0]] = item[1];
        });
        // this.route.navigate([path_name], { queryParams: query_ });
      }
      this.redirectTo(path_name, query_);
      // else { this.route.navigate([path_name]); }
    }
  }

  redirectTo(uri: string, params: any = {}): void {
    if (this.route.url !== uri) {
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.route.navigate([uri], { queryParams: params }));
    }
  }

  downloadStock(url: string): void {
    const url_object = new URL(url);
    const name_file = url_object.searchParams.get('file_name') || 'file_' + Date.now();
    this.isProgressDownloadReport = true;
    this.s_shared
      .download(url, true)
      .subscribe((event: any) => {
        let progress = 0;
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.DownloadProgress:
            progress = Math.round(event.loaded / event.total * 100);
            this.progressDownloadReport = progress;
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
              this.isProgressDownloadReport = false;
              this.progressDownloadReport = 0;
            }, 1500);
        }
      }, (err) => { this.isProgressDownloadReport = false; });
  }

  changeDark(value) {
    this.isDark = value.target.checked;
    localStorage.setItem('isDark', JSON.stringify(this.isDark));
  }

  changeWebPush(event: MatSlideToggleChange): void {
    console.log(event, event.source.name);

    const data_send = {
      preference: event.source.name,
      value: event.checked ? 'on' : 'off',
    };
    const url = 'user/preferences/' + event.source.name;
    this.methodsHttp.methodPut(url, data_send)
      .subscribe(
        (res) => {
          if (res && res.hasOwnProperty('success') && res.success) {
            SwalService.swalToast(
              event.checked ? 'Activadas' : 'Desactivada'
            );
          } else {
            event.checked = !event.checked;
          }
          event.source.disabled = false;
        },
        (err) => {
          event.checked = !event.checked;
          event.source.disabled = false;
        }
      );
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.s_auth.logout().subscribe((res: any) => {
      if (res.success) {
      }
    });
    this.s_storage.logout();
  }

  getTicketsUnread(): void {
    // const ticketsItem = this.navItems.find((item) => item.name === 'Tickets');
    // console.log({ticketsItem});
    // ticketsItem.badge = {
    //   text: '50',
    //   variant: 'primary',
    //   class: 'badge bg-info'
    // };
    // if (ticketsItem) {
    //   this.methodsHttp.methodGet('system-orders/tickets/unread-count').subscribe((res: any) => {
    //     if (res.success) {
    //       ticketsItem.badge = {
    //         text: res.data,
    //         variant: 'primary',
    //         class: 'badge bg-info'
    //       };
    //     }
    //   });
    // }
  }


}
