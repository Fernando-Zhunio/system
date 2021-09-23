import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CustomReusingStrategy } from "../../class/custom-reusing-strategy";
import { Router, RouteReuseStrategy } from '@angular/router';
import { INavData } from '@coreui/angular';
import Echo from 'laravel-echo';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomReusingStrategy } from '../../class/custom-reusing-strategy';
import { NotificationsWebPush } from '../../class/notifications-web-push';
import { Inotification } from '../../interfaces/inotification';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { navItems } from '../../_nav';
import { SwPush } from '@angular/service-worker';
import { DataSidebar } from '../../class/data-sidebar';
@Component({
  selector: 'app-dashboard',
  styles: [
    'button {outline: none;}',
    '.dark{color:gray}',
    '.not-dark{color:goldenrod}',
    '.disabled {pointer-events: none;cursor: default;}',
    '.bg-error {background:red;color:white}'

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
    private swPush: SwPush,
  ) {}
  public sidebarMinimized = false;
  public navItems = null;
  public url_img = '';
  public companies = [];
  public company_select = null;
  public isDark: boolean = false;
  public TYPE_NOTY_SOUND = 'general_notification_sound';
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

  new_Item_data = DataSidebar.NameGroupItem;

  navItemsForCategories = DataSidebar.ItemsForCategories;

  navItems_ = this.sidebarData.NavItems;

  notificationWeb: NotificationsWebPush = null;

  ngOnInit(): void {
    this.notificationWeb = new NotificationsWebPush(this.swPush, this.s_standart);
    this.notificationWeb.pushSuscription();
    if (localStorage.getItem('color_sidebar_left')) {
      this.colorSidebarLeft = localStorage.getItem('color_sidebar_left');
    } else { this.colorSidebarLeft = '#054372'; }
    this.getValueDark();
    const user = this.s_storage.getCurrentUser();
    this.s_standart.index('user/preferences/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.TYPE_NOTY_EMAIL.state =
          res.data[this.TYPE_NOTY_EMAIL.value] === 'on' ? true : false;
        this.TYPE_NOTY_WEBPUSH.state =
          res.data[this.TYPE_NOTY_WEBPUSH.value] === 'on' ? true : false;
      }
    });

    this.suscriptionNotifaction = this.s_shared.currentNotifications.subscribe(res => {
      this.notifications = res;
    });

    this.s_standart.index('notifications/ajax').subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        this.s_shared.changeNotifications(res.data)
      }
    });

    let username = user.name.replace(' ', '+');
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

    this.navItems = this.generateSideBarItems();
    let token = 'Bearer ' + this.s_storage.getCurrentToken();
    const endpoint = environment.server;
    const domain_serve = environment.domain_serve;
    // const domain_serve = "192.168.1.74";
    const port_ = 80;
    // const endpoint = 'http://'+domain_serve +'/api/';

    // descomentar para notificaciones ------------------------------------------------------------------------------

    const echo = new Echo({
      broadcaster: 'pusher',
      cluster: 'mt1',
      key: environment.keySocket,
      // key: "1564856898",
      authEndpoint: endpoint + 'broadcasting/auth',
      wsHost: domain_serve,
      disableStats: true,
      encrypted: false,
      wsPort: port_,
      wssPort: port_,
      enabledTransports: ['ws', 'wss'],
      forceTLS: false,
      auth: {
        headers: {
          Authorization: token,
          // "Access-Control-Allow-Origin": "*",
        },
      },
    });

    echo.private('App.Models.User.' + user.id).notification((notify: Inotification) => {
      this.s_shared.addNotification(notify);
      const data_rendered = notify.data;
      let name_user = 'System';
      if (data_rendered.user.hasOwnProperty('person') && data_rendered.user.person) {
        name_user = `${data_rendered.user.person.first_name} ${data_rendered.user.person.last_name}`;
      } else {
        name_user = data_rendered.user.name;
      }
      SwalService.swalToastNotification(
        this.route,
        name_user,
        data_rendered.text,
        data_rendered.type,
        data_rendered.image,
        data_rendered.url
      );
    });
  }

  ngOnDestroy(): void {
    if (this.suscriptionNotifaction) {
      this.suscriptionNotifaction.unsubscribe();
    }
  }

  unreadNotifications() {
    this.s_standart.store('notifications/mark-seen', {}).subscribe((res) => {
      if (res && res.hasOwnProperty('success') && res.success) {
        console.log(res);
      }
    });
  }

  changeColor(event): void {
    this.colorSidebarLeft = event.target.value;
    localStorage.setItem('color_sidebar_left', event.target.value);
  }

  goRouteNotification(url: string): void {
    if (url && url.includes('reports/general-stock/download')) {
      const convertUrlNg = url.split('?');
      console.log(url, convertUrlNg);
      const nameFile = convertUrlNg[1].replace(/\+-\+/gm, '_').replace('file_name=reports%2FSTOCK+GENERAL', '');
      console.log(nameFile);
      this.s_shared.download('report_stock', 'reports/general-stock/download?' + convertUrlNg[1]).subscribe((res: any) => {
        console.log(res);
        const blob = new Blob([res], { type: 'application/ms-Excel' });
        const urlDownload = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = urlDownload;
        a.download = 'reporte_de_stock' + nameFile;
        a.click();
        window.URL.revokeObjectURL(urlDownload);
        a.remove();
      });
      return;
    }
    if (url) {
    this.route.navigate([url]);
    }
  }

  getValueDark(): void {
    if (!localStorage.getItem('isDark')) {
      localStorage.setItem('isDark', JSON.stringify(this.isDark));
    } else { this.isDark = JSON.parse(localStorage.getItem('isDark')); }
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
    if (this.company_select === this.companies[index].name) { return; }
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

    for (let j = 0; j < sizePermissionAndRol; j++) {
      const item: INavData = this.navItems_.find(
        (x) => x.permission === mergePermissionAndRol[j]
      );
      if (item !== undefined) {
        this.new_Item_data[item.tag].push(item);
      }
    }

    let data_return = [];

    const keysTags = Object.keys(this.new_Item_data);
    for (let i = 0; i < keysTags.length; i++) {
      // const element = array[i];
      if (this.new_Item_data[keysTags[i]].length > 1) {
        data_return.push(...this.new_Item_data[keysTags[i]]);
      }
    }
    data_return = [
      {
        title: true,
        name: 'Home',
      },
      {
        name: 'Inicio',
        url: '/inicio',
        icon: 'icon-home',
        // permission: "products-admin.products.index",
        // tag: this.tags.admin_products,
      },
      ...data_return
    ];
    return data_return;
  }
}
