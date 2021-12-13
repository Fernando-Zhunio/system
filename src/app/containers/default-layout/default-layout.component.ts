import { Component, OnInit, OnDestroy, ViewChild, Input, HostBinding } from '@angular/core';
// import { CustomReusingStrategy } from "../../class/custom-reusing-strategy";
import { Router, RouteReuseStrategy } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { Inotification } from '../../interfaces/inotification';
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

@Component({
  selector: 'app-dashboard',
  styles: [
    'button {outline: none;}',
    '.dark{color:gray}',
    '.not-dark{color:goldenrod}',
    '.disabled {pointer-events: none;cursor: default;}',
    '.bg-error {background:red;color:white}',
    '.custom-menu-notification {height:75vh}'
  ],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  constructor(
    private s_auth: AuthService,
    private route: Router,
    private s_storage: StorageService,
    private s_standart: StandartSearchService,
    public s_shared: SharedService,
    private s_custom_reusing: RouteReuseStrategy,
    private dialog: MatDialog,
    public overlayContainer: OverlayContainer,
  ) { }
  @HostBinding('class') componentCssClass;

  public sidebarMinimized = false;
  public navItems = null;
  public url_img = '';
  public companies = [];
  public company_select = null;
  public isDark: boolean = false;
  public TYPE_NOTY_SOUND = 'general_notification_sound';
  public hideUsersChat: boolean = false;
  public progressDowloadReport: number = 0;
  public isProgressDowloadReport: boolean = false;
  public TYPE_NOTY_WEBPUSH = {
    value: 'general_notification_webpush',
    state: false,
  };
  public TYPE_NOTY_EMAIL = {
    value: 'general_notification_email',
    state: false,
  };
  public isDownloadStock: boolean = false;
  private suscriptionNotifaction: Subscription;
  public notifications: Inotification[] = [];
  colorSidebarLeft: string;
  sidebarData = new DataSidebar();
  navItems_ = this.sidebarData.NavItems;
  countNotificationUnRead: number = null;
  notificationWeb: NotificationsWebPush = null;
  countMesssages: any = null;
  echo: Echo;
  user: any;

  ngOnInit(): void {

    this.hasDarkTheme();
    this.notificationWeb = new NotificationsWebPush(this.s_standart);
    this.getPermissionAndRolesFromServer();
    this.notificationWeb.canInitSw();
    this.setSideBarColor();
    // this.getValueDark();
    this.user = this.s_storage.getCurrentUser();
    this.setPreferences();

    // console.log(this.user);

    if (!this.user.person) { this.addPersonModal(this.user); }
    this.getNotification();
    this.companiesGestion(this.user);
    this.suscribeNotifications(this.user);
  }

  ngOnDestroy(): void {
    if (this.suscriptionNotifaction) {
      this.suscriptionNotifaction.unsubscribe();
    }
    this.echo.leave('App.Models.User.' + this.user.id);
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
      this.isDark =  JSON.parse(localStorage.getItem('isDark'));
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
    e ? this.countMesssages++ : this.countMesssages = null;
  }

  getNotification(): void {
    this.suscriptionNotifaction = this.s_shared.currentNotifications.subscribe(
      (res) => {
        this.notifications = res;
      }
    );
    this.s_standart.index('notifications/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.s_shared.changeNotifications(res.data.notifications);
        const notifications = res.data.notifications;
        this.countMesssages = res.data.count_message_not_read_of_chat == 0 ? null : res.data.count_message_not_read_of_chat;
        if (notifications.length > 0) {
          const countNotification = notifications.filter(
            (notification) => !notification.read_at
          ).length;
          this.countNotificationUnRead = countNotification > 0 ? countNotification : null;
        }
      }
    });
  }

  openOrCloseChats(): void {
    this.hideUsersChat = !this.hideUsersChat;
    if (this.hideUsersChat) {
      this.countMesssages = null;
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
    this.s_standart.index('user/preferences/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.TYPE_NOTY_EMAIL.state =
          res.data[this.TYPE_NOTY_EMAIL.value] === 'on' ? true : false;
        this.TYPE_NOTY_WEBPUSH.state =
          res.data[this.TYPE_NOTY_WEBPUSH.value] === 'on' ? true : false;
      }
    });
  }

  getPermissionAndRolesFromServer() {
    this.s_standart.create('user/permissions-roles').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        const permissionAndRol = { rol: res.data.roles, permission: res.data.permissions };
        this.s_storage.setRolAndPermission(permissionAndRol);
        // console.log(permissionAndRol);

        this.navItems = this.generateSideBarItems();

      }
    });
  }
  suscribeNotifications(user): void {
    this.echo = new EchoManager(this.s_storage).echo;
    this.echo
      .private('App.Models.User.' + user.id)
      .notification((notify: Inotification) => {
        this.s_shared.addNotification(notify);
        // console.log(notify);

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
    this.s_standart.store('notifications/mark-seen', {}).subscribe((res) => {
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
 
  goRouteNotification(url: string): void {
    if (url && url.includes('reports/general-stock/download')) {
      this.downloadStock(url);
      // SwalService.swalToast('Tu descarga iniciara en unos instantes');
      return;
    }
    if (url) {
      const newUrl = url.replace('#/', '');
      // console.log(url, newUrl);

      const urlObjetc: any = new URL(newUrl);

      const path = urlObjetc.pathname;
      const queryStrings = Array.from(urlObjetc.searchParams.entries());
      if (queryStrings.length > 0) {
        const query_ = {};
        queryStrings.forEach((item) => {
          query_[item[0]] = item[1];
        });
        this.route.navigate([path], { queryParams: query_ });
      } else { this.route.navigate([path]); }
    }
  }

  downloadStock(url): void {
    const convertUrlNg = url.split('?');
    console.log(url, convertUrlNg);
    const nameFile = convertUrlNg[1]
      .replace(/\+-\+/gm, '_')
      .replace('file_name=reports%2FSTOCK+GENERAL', '');
    this.isProgressDowloadReport = true;
    this.s_shared
      .download(
        'reports/general-stock/download?' + convertUrlNg[1]
      )
      .subscribe((event: any) => {
        // console.log("descargando");
        
        // const blob = new Blob([res], { type: 'application/ms-Excel' });
        // const urlDownload = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // document.body.appendChild(a);
        // a.setAttribute('style', 'display: none');
        // a.href = urlDownload;
        // a.download = 'reporte_de_stock' + nameFile;
        // a.click();
        // window.URL.revokeObjectURL(urlDownload);
        // a.remove();
        let progress = 0;
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.DownloadProgress:
            console.log(event);
            console.log(event.loaded , event.total);
            
            progress = Math.round(event.loaded / event.total * 100);
            this.progressDowloadReport = progress;
            console.log(`Uploaded! ${progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File is completely uploaded!');
              const blob = new Blob([event.body], { type: 'application/ms-Excel' });
              const urlDownload = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              document.body.appendChild(a);
              a.setAttribute('style', 'display: none');
              a.href = urlDownload;
              a.download = 'reporte_de_stock' + nameFile;
              a.click();
              window.URL.revokeObjectURL(urlDownload);
              a.remove();
              setTimeout(() => {
                this.isProgressDowloadReport = false;
                this.progressDowloadReport = 0;
              }, 1500);
            console.log('User successfully created!', event.body);
        }
      }, (err) => { this.isProgressDowloadReport = false; });
  }

  // getValueDark(): void {
  //   if (!localStorage.getItem('isDark')) {
  //     localStorage.setItem('isDark', JSON.stringify(this.isDark));
  //   } else {
  //     this.isDark = JSON.parse(localStorage.getItem('isDark'));
  //   }
  // }

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
    this.s_standart.updatePut(url, data_send).subscribe(
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
        this.route.navigate(['/']).then(() => {
          this.s_custom_reusing['cache'] = {};
        });
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
    const isSuperAdmin = permissionAndRol.rol.find((x) => x === 'super-admin');
    if (isSuperAdmin !== undefined) {
      return this.navItems_;
    }

    const sizePermissionAndRol = mergePermissionAndRol.length;
    // console.log(mergePermissionAndRol);

    for (let j = 0; j < sizePermissionAndRol; j++) {
      const item: INavData = this.navItems_.find(
        (x) => x.permission === mergePermissionAndRol[j]
      );
      if (item !== undefined) {
        // console.log(item.name);
        new_Item_data[item.tag].push(item);
      }
    }
    // console.log(new_Item_data);

    let data_return = [];
    const keysTags = Object.keys(new_Item_data);
    for (let i = 0; i < keysTags.length; i++) {
      if (new_Item_data[keysTags[i]].length > 1) {
        data_return.push(...new_Item_data[keysTags[i]]);
      }
    }
    // console.log(data_return);
    data_return = [
      ...data_return,
    ];
    return data_return;
  }


}
