import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { INotification, INotificationData } from '../../interfaces/inotification';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { DataSidebar } from '../../class/data-sidebar';
import { INavData } from '../../interfaces/inav-data';
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
    private s_standard: StandartSearchService,
    public s_shared: SharedService,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    public sw_push: SwPush,
    private store: Store,
  ) {
    this.notifications$ = this.store.select(selectNotification);
  }

  notifications$: Observable<INotification[]>;

  @HostBinding('class') componentCssClass;

  public sidebarMinimized = false;
  public navItems = null;
  public url_img = '';
  public companies = [];
  public company_select = null;
  public isDark: boolean = false;
  public TYPE_NOTY_SOUND = 'general_notification_sound';
  public hideUsersChat: boolean = false;
  public progressDownloadReport: number = 0;
  public isProgressDownloadReport: boolean = false;
  public TYPE_NOTY_WEBPUSH = {
    value: 'general_notification_webpush',
    state: false,
  };
  public TYPE_NOTY_EMAIL = {
    value: 'general_notification_email',
    state: false,
  };
  public isDownloadStock: boolean = false;

  colorSidebarLeft: string;
  // sidebarData = new DataSidebar();
  navItems_ = new DataSidebar().NavItems;
  // navItems_ = [];
  countNotificationUnRead: number = null;
  notificationWeb: NotificationsWebPush = null;
  countMessages: any = null;
  echo: Echo;
  user: any;
  searchBar: ListPermissions;
  pageSearch: any[] = [];
  imgCompany: { size: string, url: string } = { size: '100%', url: 'assets/icons_custom/novisolutions.svg' };

  ngOnInit(): void {

    this.setImgCompanies();
    this.hasDarkTheme();
    this.notificationWeb = new NotificationsWebPush(this.sw_push, this.s_standard);
    this.getPermissionAndRolesFromServer();
    this.notificationWeb.canInitSw();
    this.setSideBarColor();
    this.user = this.s_storage.getCurrentUser();
    this.setPreferences();
    if (!this.user.person) { this.addPersonModal(this.user); }
    this.getNotification();
    this.companiesGestion(this.user);
    this.suscribeNotifications(this.user);
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


  searchPage(event): void {
    this.pageSearch = this.searchBar.searchRoute(event.target.value);
    // console.log(event.target.value, this.pageSearch);
  }

  goPage(page): void {
    this.route.navigate([page]);
  }

  closeSearch(): void {
    setTimeout(() => {
      this.pageSearch = [];
    }, 500);
  }

  onSetTheme(e: MatSlideToggleChange | { checked: boolean }): void {
    const theme = e.checked ? 'dark-theme' : 'light-theme';
    localStorage.setItem('isDark', e.checked ? 'true' : 'false');
    this.isDark = false;
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
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

  setSideBarColor(): void {
    if (localStorage.getItem('color_sidebar_left')) {
      this.colorSidebarLeft = localStorage.getItem('color_sidebar_left');
    } else {
      this.colorSidebarLeft = '#054372';
    }
  }

  newMessage(e): void {
    e ? this.countMessages++ : this.countMessages = null;
  }

  getNotification(): void {
    this.s_standard.index('notifications/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.store.dispatch(overrideNotification({ notifications: res.data.notifications }));
        const notifications = res.data.notifications;
        // ** Esta propiedad también viene en las notificaciones aun que se refiera a los mensajes no leídos de los chats */
        this.countMessages = res.data.count_message_not_read_of_chat == 0 ? null : res.data.count_message_not_read_of_chat;

        if (notifications.length > 0) {
          // ** Si hay notificaciones sin leer */
          const countNotification = notifications.filter((notification) => !notification.read_at).length;
          this.countNotificationUnRead = countNotification > 0 ? countNotification : null;
        }
      }
    });
  }

  openOrCloseChats(): void {
    this.hideUsersChat = !this.hideUsersChat;
    if (this.hideUsersChat) {
      this.countMessages = null;
    }
  }

  companiesGestion(user): void {
    const username = user.name.replace(' ', '+');
    this.url_img = 'https://ui-avatars.com/api/?name=' + username;
    this.companies = user.companies;
    localStorage.setItem('companies', JSON.stringify(this.companies));
    const id_company = user.company_company_id;
    const index = this.companies.findIndex((x) => x.id == id_company);
    if (index == -1) {
      this.companies.push({ id: 'all', name: 'Todas las empresas' });
      this.company_select = 'Todas las empresas';
    } else {
      this.company_select = this.companies[index].name;
      const indexAll = this.companies.findIndex((x) => x.id == 'all');
      if (indexAll == -1) {
        this.companies.push({ id: 'all', name: 'Todas las empresas' });
      }
    }
  }

  setPreferences(): void {
    this.s_standard.index('user/preferences/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.TYPE_NOTY_EMAIL.state =
          res.data[this.TYPE_NOTY_EMAIL.value] === 'on' ? true : false;
        this.TYPE_NOTY_WEBPUSH.state =
          res.data[this.TYPE_NOTY_WEBPUSH.value] === 'on' ? true : false;
        this.store.dispatch(setPreference({ preference: res.data }));
      }
    });
  }

  getPermissionAndRolesFromServer() {
    this.s_standard.create('user/permissions-roles').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        const permissionAndRol = { rol: res.data.roles, permission: res.data.permissions };
        this.s_storage.setRolAndPermission(permissionAndRol);
        // console.log(permissionAndRol);
        this.searchBar = new ListPermissions(this.s_storage);
        this.navItems = this.generateSideBarItems();
      }
    }, err => {
      console.log(err);
      SwalService.swalFire({title: 'Error', text: 'Se necesita que recargué la pagina, si el error continua por favor póngase en contacto con el desarrollador del sistema'});
    });
  }

  suscribeNotifications(user): void {
    this.echo = new EchoManager(this.s_storage).echo;
    this.echo
      .private('App.Models.User.' + user.id)
      .notification((notify: INotification) => {
        this.store.dispatch(addNotification({ notification: notify }));
        if (notify.type == 'App\\Notifications\\NotificationPrice') {
          this.store.dispatch(generatePrice({data: notify.data}));
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

  unreadNotifications() {
    this.s_standard.store('notifications/mark-seen', {}).subscribe((res) => {
      if (this.countNotificationUnRead > 0) {
        this.countNotificationUnRead = null;
      }
      if (res && res.hasOwnProperty('success') && res.success) {
      }
    });
  }

  changeColor(event): void {
    this.colorSidebarLeft = event.target.value;
    localStorage.setItem('color_sidebar_left', event.target.value);
  }

  goRouteNotification(notificationData: INotificationData): void {
    if (notificationData.url) {
      this.downloadStock(notificationData.url);
      return;
    }
    if (notificationData.route) {
      const urlOutHash = notificationData.route.replace('#/', '');
      const url_object: any = new URL(urlOutHash);
      const path_name = url_object.pathname;
      const queryStrings = Array.from(url_object.searchParams.entries());
      if (queryStrings.length > 0) {
        const query_ = {};
        queryStrings.forEach((item) => {
          query_[item[0]] = item[1];
        });
        this.route.navigate([path_name], { queryParams: query_ });
      } else { this.route.navigate([path_name]); }
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
            a.download =  name_file;
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

  changeWebPush(type_notify, value): void {
    // this.pushStateChange(id);
    value.target.disabled = true;
    const data_send = {
      preference: type_notify,
      value: value.target.checked ? 'on' : 'off',
    };
    const url = 'user/preferences/' + type_notify;
    this.s_standard.updatePut(url, data_send).subscribe(
      (res) => {
        if (res && res.hasOwnProperty('success') && res.success) {
          SwalService.swalToast(
            value.target.checked ? 'Activadas' : 'Desactivada'
          );
        } else {
          value.target.checked = !value.target.checked;
        }
        value.target.disabled = false;
      },
      (err) => {
        value.target.checked = !value.target.checked;
        value.target.disabled = false;
      }
    );
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.s_auth.logout().subscribe((res: any) => {
      if (res.success) {
        this.s_storage.logout();
      }
    });
  }

  changeCompany(idCompany, index): void {
    if (this.company_select === this.companies[index].name) {
      return;
    }
    this.s_auth.changedCompany(idCompany).subscribe((res) => {
      if (res.success) {
        SwalService.swalToast('Compañia cambiada con exito');
        this.company_select = this.companies[index].name;
        this.s_storage.setCompanyUser(idCompany);
        // this.route.navigate(['/']).then(() => {
        //   this.s_custom_reusing['cache'] = {};
        // });
      }
    });
  }


  generateSideBarItems(): INavData[] {
    const new_Item_data = new DataSidebar().NameGroupItem;
    const permissionAndRol = this.s_storage.getRolAndPermissionUser();
    const mergePermissionAndRol: string[] = [
      ...permissionAndRol.permission,
      ...permissionAndRol.rol,
    ];

    // * Si es super usuario retorna todo los item de la clase dataSidebar
    const isSuperAdmin = permissionAndRol.rol.find((x) => x === 'super-admin');
    if (isSuperAdmin !== undefined) {
      return this.navItems_;
    }

    const sizePermissionAndRol = mergePermissionAndRol.length;

    for (let j = 0; j < sizePermissionAndRol; j++) {
      const item: INavData = this.navItems_.find(
        (x) => x.permission === mergePermissionAndRol[j]
      );
      if (item !== undefined) {
        new_Item_data[item.tag].push(item);
      }
    }
    mergePermissionAndRol.forEach((item) => {

    });

    let data_return = [];
    const keysTags = Object.keys(new_Item_data);
    for (let i = 0; i < keysTags.length; i++) {
      if (new_Item_data[keysTags[i]].length > 1) {
        data_return.push(...new_Item_data[keysTags[i]]);
      }
    }
    data_return = [
      ...data_return,
    ];
    return data_return;
  }


}
