import { Component, OnInit, OnDestroy, HostBinding, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { INotification } from '../../interfaces/inotification';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared/shared.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { MatDialog } from '@angular/material/dialog';
import { AddInfoPersonModalComponent } from '../../components/modals/add-info-person-modal/add-info-person-modal.component';
import { OverlayContainer } from '@angular/cdk/overlay';
// import { EchoManager } from '../../class/echo-manager';
import Echo from 'laravel-echo';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
// import { HttpEventType } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { ListPermissions } from '../../class/list-permissions';
import { Store } from '@ngrx/store';
import { selectNotification } from '../../redux/state/state.selectors';
// import { generatePrice, idlePrice } from '../../redux/actions/price.action';
import { compare } from 'compare-versions';
import { MethodsHttpService } from '../../services/methods-http.service';
import { INavData } from '../../interfaces/inav-data';
import { SidebarFzComponent } from '../sidebar-fz/sidebar-fz.component';
// import { NOTIFICATIONS_CREATE_POPUP, SET_NOTIFICATIONS } from '../../redux/notifications/actions/notifications.action';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./default-layout.component.css'],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private sa: AuthService,
    // private route: Router,
    private ss: StorageService,
    private methodsHttp: MethodsHttpService,
    public s_shared: SharedService,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    public sw_push: SwPush,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    // private preferencesServices: PreferencesService,
  ) {
    this.notifications$ = this.store.select(selectNotification);
  }
  notifications$: Observable<INotification[]>;

  @HostBinding('class') componentCssClass;
  @ViewChild(SidebarFzComponent) sidebarFz: SidebarFzComponent;

  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  public url_img = '';
  public isDark: boolean = false;
  public hideUsersChat: boolean = false;
  public progressDownloadReport: number = 0;
  public isProgressDownloadReport: boolean = false;
  public isDownloadStock: boolean = false;
  hiddenSidebar: boolean = false;

  countNotificationUnRead: number | null = null;
  notificationWeb: NotificationsWebPush | null = null;
  countMessages: any = null;
  echo: Echo;
  user: any;
  searchBar: ListPermissions;
  imgCompany: { size: string, url: string } = { size: '100%', url: 'assets/icons_custom/novisolutions.svg' };

  // notification = {
  //   webpush: false,
  //   email: false
  // }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ res }) => {
      console.log({res})
      this.getPermissionAndVersionServer(res);
      // this.setPreferences(res.preferences); // in resolver
    }).unsubscribe();
    // this.getNotification(); // in resolver
    this.loadUnreadCountMessages();
    // this.setImgCompanies(); //not loaded in resolver
    this.hasDarkTheme(); //not loaded in resolver
    this.notificationWeb = new NotificationsWebPush(this.methodsHttp); //not loaded in resolver
    // this.getPermissionAndVersionServerTest();
    this.notificationWeb.canInitSw(); //not loaded in resolver
    this.user = this.ss.getCurrentUser(); //not loaded in resolver
    if (!this.user.person) { this.addPersonModal(this.user); } //not loaded in resolver
    // this.suscribeNotifications(this.user); // not loaded in resolver
  }

  ngOnDestroy(): void {
    this.echo.leave('App.Models.User.' + this.user.id);
  }

  openOrCloseMenu(): void {
    this.sidebarFz.toggleMenu();
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
    const isDark = localStorage.getItem('isDark');
    if (isDark) {
      this.onSetTheme({ checked: JSON.parse(isDark) });
      this.isDark = JSON.parse(isDark);
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
          const userCurrent = this.ss.getCurrentUser();
          if (userCurrent) {
            userCurrent.person = res;
            this.ss.setCurrentUser(userCurrent);
          }
        }
      });
  }

  newMessage(e): void {
    e ? this.countMessages++ : this.countMessages = null;
  }

  // getNotification(): void {
  //   this.methodsHttp.methodGet('notifications/ajax').subscribe((res: any) => {
  //   if (res?.success) {
  //     this.store.dispatch(SET_NOTIFICATIONS({ notifications: res.data }));
  //     const notifications = res.data;
  //     if (notifications.length > 0) {
  //       const countNotification = notifications.filter((notification) => !notification.read_at).length;
  //       this.countNotificationUnRead = countNotification > 0 ? countNotification : null;
  //     }
  //   }});
  // }

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

  getPermissionAndVersionServer(res): void {
    if (res?.success) {
      const {last_version_frontend, my_permissions} = res.data;
      if (last_version_frontend?.version) {
        this.validateVersion(last_version_frontend?.version, last_version_frontend?.description);
      }
      const array_permissions = typeof my_permissions == 'string' && my_permissions === 'super-admin' ?
        [my_permissions] : my_permissions;
      this.ss.setPermission(array_permissions);
      this.navItems =  res.data.item_sidebar;
    }
  }

  // getPermissionAndVersionServerTest() {
  //   this.methodsHttp.methodGet('user/permissions-roles').subscribe((res) => {
  //     if (res?.success) {
  //       if (res.data?.last_version_frontend?.version) {
  //         this.validateVersion(res.data?.last_version_frontend?.version, res.data?.last_version_frontend?.description);
  //       }
  //       const permissions = TEST_PERMISSIONS;
  //       const array_permissions = typeof permissions == 'string' && permissions == 'super-admin' ?
  //         [permissions] : permissions;
  //       this.s_storage.setPermission(array_permissions);
  //       this.navItems = res.data.item_sidebar;
  //       this.getTicketsUnread();
  //     }
  //   }, err => {
  //     console.log(err);
  //     SwalService.swalFire({ title: 'Error', text: 'Se necesita que recargué la pagina, si el error continua por favor póngase en contacto con el desarrollador del sistema' });
  //   });
  // }

  validateVersion(latestVersion: string, message: string): void {
    try {
      const currentVersion = this.ss.getItemLocalStorage('version');
      if (currentVersion) {
        const isNewVersion = compare(currentVersion, latestVersion, '<'); // true
        if (isNewVersion) {
          SwalService.swalFire({ allowOutsideClick: false, showCancelButton: true, cancelButtonText: 'No, gracias', confirmButtonText: 'Si, actualizar', showConfirmButton: true, title: 'Actualización disponible', text: 'Hay una nueva versión de la aplicación, por favor actualice la aplicación, presione Ctrl + f5 \n' + message, icon: 'info' })
            .then((res) => {
              console.log(res);
              if (res.isConfirmed) {
                this.ss.setItemLocalStorage('version', latestVersion);
                console.log('Confirmado');
                location.reload();
              }
            }).catch(() => { });
        }
      } else {
        this.ss.setItemLocalStorage('version', latestVersion);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // suscribeNotifications(user): void {
  //   this.echo = new EchoManager(this.ss).echo;
  //   this.echo
  //     .private('App.Models.User.' + user.id)
  //     .notification((notify: INotification) => {
  //       this.store.dispatch(NOTIFICATIONS_CREATE_POPUP({ notification: notify }));
  //       if (notify.type == 'App\\Notifications\\NotificationPrice') {
  //         this.store.dispatch(generatePrice({ data: notify.data }));
  //       }
  //       if (notify.type === 'App\\Notifications\\ErrorPriceNotification') {
  //         this.store.dispatch(idlePrice());
  //       }
  //       if (this.countNotificationUnRead) {
  //         this.countNotificationUnRead = this.countNotificationUnRead + 1;
  //       }
  //     });
  // }

  // calls = new Subject();

  // unreadNotifications() {
  //   this.calls.next(true);
  //   SharedService.disabled_loader = true;
  //   this.methodsHttp.methodPost('notifications/mark-seen', {})
  //   .pipe(takeUntil(this.calls))
  //   .subscribe(() => {
  //     if (this.countNotificationUnRead && this.countNotificationUnRead > 0) {
  //       this.countNotificationUnRead = null;
  //     }
  //   });
  // }

  // goRouteNotification(notificationData: INotificationData): void {
  //   if (notificationData.url) {
  //     this.downloadStock(notificationData.url);
  //     return;
  //   }
  //   if (notificationData?.route) {
  //     const urlOutHash = notificationData.route.replace('#/', '');
  //     const url_object: any = new URL(urlOutHash);
  //     const path_name = url_object.pathname;
  //     console.log(this.route.url, path_name);
  //     const queryStrings = Array.from(url_object.searchParams.entries());
  //     const query_ = {};
  //     if (queryStrings.length > 0) {
  //       queryStrings.forEach((item: any) => {
  //         query_[item[0]] = item[1];
  //       });
  //       // this.route.navigate([path_name], { queryParams: query_ });
  //     }
  //     this.redirectTo(path_name, query_);
  //     // else { this.route.navigate([path_name]); }
  //   }
  // }

  // redirectTo(uri: string, params: any = {}): void {
  //   if (this.route.url !== uri) {
  //     this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
  //       this.route.navigate([uri], { queryParams: params }));
  //   }
  // }

  // downloadStock(url: string): void {
  //   const url_object = new URL(url);
  //   const name_file = url_object.searchParams.get('file_name') || 'file_' + Date.now();
  //   this.isProgressDownloadReport = true;
  //   this.s_shared
  //     .download(url, true)
  //     .subscribe((event: any) => {
  //       let progress = 0;
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           break;
  //         case HttpEventType.DownloadProgress:
  //           progress = Math.round(event.loaded / event.total * 100);
  //           this.progressDownloadReport = progress;
  //           break;
  //         case HttpEventType.Response:
  //           const blob = new Blob([event.body], { type: 'application/ms-Excel' });
  //           const urlDownload = window.URL.createObjectURL(blob);
  //           const a = document.createElement('a');
  //           document.body.appendChild(a);
  //           a.setAttribute('style', 'display: none');
  //           a.href = urlDownload;
  //           a.download = name_file;
  //           a.click();
  //           window.URL.revokeObjectURL(urlDownload);
  //           a.remove();
  //           setTimeout(() => {
  //             this.isProgressDownloadReport = false;
  //             this.progressDownloadReport = 0;
  //           }, 1500);
  //       }
  //     }, () => { this.isProgressDownloadReport = false; });
  // }

  changeDark(value) {
    this.isDark = value.target.checked;
    localStorage.setItem('isDark', JSON.stringify(this.isDark));
  }

  logout(): void {
    this.sa.logout();
  }
}
