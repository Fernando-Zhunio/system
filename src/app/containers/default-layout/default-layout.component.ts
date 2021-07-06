import { Component, OnInit } from "@angular/core";
// import { CustomReusingStrategy } from "../../class/custom-reusing-strategy";
import { Router, RouteReuseStrategy } from "@angular/router";
import { INavData } from "@coreui/angular";
import Echo from "laravel-echo";
import { NgxPermissionsService } from "ngx-permissions";
import { Subscription } from "rxjs";
import { environment } from "../../../environments/environment";
import { CustomReusingStrategy } from "../../class/custom-reusing-strategy";
import { Inotification } from "../../interfaces/inotification";
import { AuthService } from "../../services/auth.service";
import { SharedService } from "../../services/shared/shared.service";
import { StandartSearchService } from "../../services/standart-search.service";
import { StorageService } from "../../services/storage.service";
import { SwalService } from "../../services/swal.service";
import { navItems } from "../../_nav";

@Component({
  selector: "app-dashboard",
  styles: [
    "button {outline: none;}",
    ".dark{color:gray}",
    ".not-dark{color:goldenrod}",
    ".disabled {pointer-events: none;cursor: default;}"
  ],
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  // public navItems = navItems;
  public navItems = null;
  public url_img = "";
  public companies = [];
  public company_select = null;
  public isDark: boolean = false;
  public TYPE_NOTY_SOUND = "general_notification_sound";
  public TYPE_NOTY_WEBPUSH = {
    value: "general_notification_webpush",
    state: false,
  };
  public TYPE_NOTY_EMAIL = {
    value: "general_notification_email",
    state: false,
  };
  public isDownloadStock: boolean = false;
  private suscriptionNotifaction :Subscription;
  public notifications: Inotification[] = [];
  colorSidebarLeft:string;
  constructor(
    private s_auth: AuthService,
    private route: Router,
    private s_storage: StorageService,
    private s_standart: StandartSearchService ,
    public s_shared: SharedService,
    private s_custom_reusing: RouteReuseStrategy ,
  ) {
    // s_custom_reusing ;
  }

  ngOnInit(): void {
    if(localStorage.getItem('color_sidebar_left')){
      this.colorSidebarLeft = localStorage.getItem('color_sidebar_left');
    } else this.colorSidebarLeft = '#054372';
    this.getValueDark();
    let user = this.s_storage.getCurrentUser();
    this.s_standart.index("user/preferences/ajax").subscribe((res) => {
      if (res && res.hasOwnProperty("success") && res.success) {
        this.TYPE_NOTY_EMAIL.state =
          res.data[this.TYPE_NOTY_EMAIL.value] == "on" ? true : false;
        this.TYPE_NOTY_WEBPUSH.state =
          res.data[this.TYPE_NOTY_WEBPUSH.value] == "on" ? true : false;
      }
    });

    this.suscriptionNotifaction = this.s_shared.currentNotifications.subscribe(res=>{
      this.notifications = res;
    });

    this.s_standart.index("notifications/ajax").subscribe((res) => {
      if (res && res.hasOwnProperty("success") && res.success) {
        this.s_shared.changeNotifications(res.data)
      }
    });

    let username = user.name.replace(" ", "+");
    this.url_img = "https://ui-avatars.com/api/?name=" + username;
    this.companies = user.companies;
    localStorage.setItem('companies',JSON.stringify(this.companies));
    const id_company = user.company_company_id;
    const index = this.companies.findIndex((x) => x.id == id_company);
    if (index == -1) {
      this.companies.push({ id: "all", name: "Todas las empresas" });
      this.company_select = "Todas las empresas";
    } else {
      this.company_select = this.companies[index].name;
      const indexAll = this.companies.findIndex((x) => x.id == "all");
      if (indexAll == -1) {
        this.companies.push({ id: "all", name: "Todas las empresas" });
      }
    }

    this.navItems = this.generateSideBarItems();
    let token = "Bearer " + this.s_storage.getCurrentToken();
    const endpoint = environment.server;
    const domain_serve = environment.domain_serve;
    // const domain_serve = "192.168.1.74";
    const port_ = 6001;
    // const endpoint = 'http://'+domain_serve +'/api/';

    // descomentar para notificaciones ------------------------------------------------------------------------------

    const echo = new Echo({
      broadcaster: "pusher",
      cluster: "mt1",
      key: "03045e5e16a02b690e4c",
      // key: "1564856898",
      authEndpoint: endpoint + "broadcasting/auth",
      wsHost: domain_serve,
      disableStats: true,
      encrypted: false,
      wsPort: port_,
      wssPort: port_,
      enabledTransports: ["ws", "wss"],
      forceTLS: false,
      auth: {
        headers: {
          Authorization: token,
          // "Access-Control-Allow-Origin": "*",
        },
      },
    });

    echo.private("App.User." + user.id).notification((notify:Inotification) => {
      console.log(notify);
      this.s_shared.addNotification(notify);
      const data_rendered = notify.data;
      console.log({ data_rendered });
      let name_user: string = "System";
      if (data_rendered.user.hasOwnProperty("person") && data_rendered.user.person) {
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
    if(this.suscriptionNotifaction){
      this.suscriptionNotifaction.unsubscribe();
    }
  }

  changeColor(event):void{
    console.log(event);
    this.colorSidebarLeft = event.target.value
    localStorage.setItem('color_sidebar_left',event.target.value)
  }

  goRouteNotification(url:any):void{
    // console.log(url);
    if(url)
    this.route.navigate([url.path])
  }

  getValueDark(): void {
    if (!localStorage.getItem("isDark"))
      localStorage.setItem("isDark", JSON.stringify(this.isDark));
    else this.isDark = JSON.parse(localStorage.getItem("isDark"));
  }


  changeDark(value) {
    this.isDark = value.target.checked;
    localStorage.setItem("isDark", JSON.stringify(this.isDark));
  }

  changeWebPush(type_notify, value): void {
    // this.pushStateChange(id);
    value.target.disabled = true;
    const data_send = {
      preference: type_notify,
      value: value.target.checked ? "on" : "off",
    };
    const url = "user/preferences/" + type_notify;
    this.s_standart.updatePut(url, data_send).subscribe(
      (res) => {
        if (res && res.hasOwnProperty("success") && res.success) {
          SwalService.swalToast(
            value.target.checked ? "Activadas" : "Desactivada"
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

  downloadStock(): void {
    this.isDownloadStock = true;
    this.s_standart.create("reports/general-stock").subscribe((res) => {
      console.log(res);
      this.isDownloadStock = false;
      SwalService.swalToast(res.data,'success','bottom-end')
    });
  }

  changeCompany(idCompany, index): void {
    if (this.company_select == this.companies[index].name) return;
    this.s_auth.changedCompany(idCompany).subscribe((res) => {
      if (res.success) {
        SwalService.swalToast("Compañia cambiada con exito");
        // const aux_company = this.company_select;
        this.company_select = this.companies[index].name;
        this.s_storage.setCompanyUser(idCompany);
        // console.log(this.s_custom_reusing['cache']);
        // console.log(this.s_custom_reusing['cache']);

        // this.route.navigateByUrl(`/`).then(() => {
        //   this.route.navigateByUrl(this.route.url);
        // });
        this.route.navigate(['/']).then(()=>{
          this.s_custom_reusing['cache'] = {};

        })
        // const custon = this.s_custom_reusing as CustomReusingStrategy;
        // custon.clearCache()
        // this.companies[index].name = aux_company;
      }
      // SwalService.swalToast('Up! a ocu');
    });
  }

  //#region

  new_Item_data = {
    section_info_general: [
      {
        title: true,
        name: "Informacion General",
      },
    ],

    section_catalogo: [
      {
        title: true,
        name: "Catalogo",
      },
    ],

    section_admin_products: [
      {
        title: true,
        name: "Administracion de Producto",
      },
    ],

    section_imports: [
      {
        title: true,
        name: "Importaciones",
      },
    ],

    section_admin_system: [
      {
        title: true,
        name: "Administracion del sistema",
      },
    ],

    section_report: [
      {
        title: true,
        name: "Administracion del sistema",
      },
    ],
  };

  tags = {
    admin_products: "section_admin_products",
    catalogs: "section_catalogo",
    imports: "section_imports",
    reports: "section_report",
    info_general: "section_info_general",
    admin_system: "section_admin_system",
  };

  generateSideBarItems(): INavData[] {
    const permissionAndRol = this.s_storage.getRolAndPermissionUser();
    const mergePermissionAndRol: string[] = [
      ...permissionAndRol.permission,
      ...permissionAndRol.rol,
    ];
    const isSuperAdmin = permissionAndRol.rol.find((x) => x == "super-admin");
    if (isSuperAdmin != undefined) {
      return this.navItems_;
    }

    // console.log(mergePermissionAndRol);

    const sizePermissionAndRol = mergePermissionAndRol.length;

    for (let j = 0; j < sizePermissionAndRol; j++) {
      let item: INavData = this.navItems_.find(
        (x) => x.permission == mergePermissionAndRol[j]
      );
      if (item != undefined) {
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
        name: "Home",
      },
      {
        name: "Inicio",
        url: "/inicio",
        icon: "icon-home",
        // permission: "products-admin.products.index",
        // tag: this.tags.admin_products,
      },
      ...data_return
    ];
    return data_return;
  }

  navItemsForCategories = {
    product_admin: [
      {
        title: true,
        name: "Administracion de productos",
      },
      {
        name: "Productos",
        url: "/admin-products/productos",
        icon: "icon-basket",
        permission: "products-admin.products.index",
      },
      {
        name: "Vtex Productos",
        url: "/admin-products/vtex-products",
        icon: "icon-basket",
        permission: "products-admin.products.index",
      },
      {
        name: "Categoria",
        url: "/admin-products/categorias",
        icon: "icon-badge",
        permission: "products-admin.categories.index",
      },
      {
        name: "Marcas",
        url: "/admin-products/marcas",
        icon: "icon-bag",
        permission: "products-admin.brands.index",
      },
      {
        name: "Prefijos",
        url: "/admin-products/prefijos",
        icon: "fab fa-autoprefixer",
        permission: "products-admin.prefixes.index",
      },
    ],

    catalogs: [
      {
        title: true,
        name: "Catalogo",
      },
      {
        name: "Buscar producto",
        url: "/catalogo/buscar_productos",
        icon: "fas fa-search",
        permission: "catalogs.products.index",
      },
      {
        name: "Mercado libre",
        url: "/catalogo/mercado-libre",
        icon: "far fa-handshake",
        permission: "catalogs.ml-products.index",
      },
      {
        name: "Publicaciones",
        url: "/catalogo/publicaciones",
        icon: "fab fa-telegram-plane",
        permission: "catalogs.publications.index",
      },
    ],

    imports: [
      {
        title: true,
        name: "Importaciones",
      },
      {
        name: "Proveedores",
        url: "/importaciones/proveedores",
        icon: "icon-briefcase",
        permission: "purchase-department.imports.index",
      },
      {
        name: "Codificar importaciones",
        url: "/importaciones/codificar-importaciones",
        icon: "far fa-handshake",
        permission: "purchase-department.imports.index",
      },
      {
        name: "Precios y promociones",
        url: "/importaciones/precios-promociones",
        icon: "icon-briefcase",
        permission: "purchase-department.imports.index",
      },
    ],

    reports: [
      {
        title: true,
        name: "Reportes",
      },
      {
        name: "Grupo de Productos",
        url: "/reports/group-products",
        icon: "icon-briefcase",
        permission: "reports.group-products.index",
      },
    ],

    info_general: [
      {
        title: true,
        name: "Informacion general",
      },
      {
        name: "Organizacion",
        url: "/information-general/organizacion",
        icon: "icon-briefcase",
        //este permimso no existe
        permission: "general.organization.index",
      },
    ],

    admin_system: [
      {
        title: true,
        name: "Administracion del sistema",
      },
      {
        name: "Usuarios",
        url: "/administracion-sistema/usuarios",
        icon: "icon-user-following",
        permission: "admin.users.index",
      },

      {
        name: "Personas",
        url: "/administracion-sistema/personas",
        icon: "icon-user",
        permission: "admin.people.index",
      },

      {
        name: "Roles",
        url: "/administracion-sistema/roles",
        icon: "icon-briefcase",
        permission: "admin.roles.index",
      },

      {
        name: "Paises",
        url: "/administracion-sistema/paises",
        icon: "icon-globe",
        permission: "admin.countries.index",
      },
      {
        name: "Locaciones",
        url: "/administracion-sistema/locaciones",
        icon: "icon-directions",
        permission: "admin.locations.index",
      },
    ],
  };

  navItems_: INavData[] = [
    {
      title: true,
      name: "Home",
    },
    {
      name: "Inicio",
      url: "/home/inicio",
      icon: "icon-home",
      // permission: "products-admin.products.index",
      // tag: this.tags.admin_products,
    },
    {
      name: "Dashboard",
      url: "/home/dashboard",
      icon: "icon-speedometer",
      // permission: "products-admin.products.index",
      // tag: this.tags.admin_products,
    },
    //#region admin products
    {
      title: true,
      name: "Administracion de productos",
    },
    {
      name: "Productos",
      url: "/admin-products/productos",
      icon: "icon-basket",
      permission: "products-admin.products.index",
      tag: this.tags.admin_products,
    },
    {
      name: "Vtex Productos",
      url: "/admin-products/vtex-products",
      icon: "icon-basket",
      permission: "products-admin.products.index",
      tag: this.tags.admin_products,
    },
    {
      name: "Categoria",
      url: "/admin-products/categorias",
      icon: "icon-badge",
      permission: "products-admin.categories.index",
      tag: this.tags.admin_products,
    },
    {
      name: "Marcas",
      url: "/admin-products/marcas",
      icon: "icon-bag",
      permission: "products-admin.brands.index",
      tag: this.tags.admin_products,
    },
    {
      name: "Prefijos",
      url: "/admin-products/prefijos",
      icon: "fab fa-autoprefixer",
      permission: "products-admin.prefixes.index",
      tag: this.tags.admin_products,
    },

    //#endregion

    //#region Catalogos
    {
      title: true,
      name: "Catalogo",
    },
    {
      name: "Buscar producto",
      url: "/catalogo/buscar_productos",
      icon: "fas fa-search",
      permission: "catalogs.products.index",
      tag: this.tags.catalogs,
    },
    {
      name: "Mercado libre",
      url: "/catalogo/mercado-libre",
      icon: "far fa-handshake",
      permission: "catalogs.ml-products.index",
      tag: this.tags.catalogs,
    },
    {
      name: "Publicaciones",
      url: "/catalogo/publicaciones",
      icon: "fab fa-telegram-plane",
      permission: "catalogs.publications.index",
      tag: this.tags.catalogs,
    },
    //#endregion

    //#region imports
    {
      title: true,
      name: "Importaciones",
    },
    {
      name: "Proveedores",
      url: "/importaciones/proveedores",
      icon: "icon-briefcase",
      permission: "purchase-department.imports.index",
      tag: this.tags.imports,
    },
    {
      name: "Codificar importaciones",
      url: "/importaciones/codificar-importaciones",
      icon: "far fa-handshake",
      permission: "purchase-department.imports.index",
      tag: this.tags.imports,
    },
    {
      name: "Precios y promociones",
      url: "/importaciones/precios-promociones",
      icon: "icon-briefcase",
      permission: "purchase-department.imports.index",
      tag: this.tags.imports,
    },
    //#endregion

    //#region Reportes
    {
      title: true,
      name: "Reportes",
    },
    {
      name: "Grupo de Productos",
      url: "/reports/group-products",
      icon: "icon-briefcase",
      permission: "reports.group-products.index",
      tag: this.tags.reports,
    },
    //#endregion

    //#region info general
    {
      title: true,
      name: "Informacion general",
    },
    {
      name: "Organizacion",
      url: "/information-general/organizacion",
      icon: "icon-briefcase",
      //este permimso no existe
      permission: "general.organization.index",
      tag: this.tags.info_general,
    },
    //#endregion

    //#region admin system
    {
      title: true,
      name: "Administracion del sistema",
    },
    {
      name: "Usuarios",
      url: "/administracion-sistema/usuarios",
      icon: "icon-user-following",
      permission: "admin.users.index",
      tag: this.tags.admin_system,
    },

    {
      name: "Personas",
      url: "/administracion-sistema/personas",
      icon: "icon-user",
      permission: "admin.people.index",
      tag: this.tags.admin_system,
    },

    {
      name: "Roles",
      url: "/administracion-sistema/roles",
      icon: "icon-briefcase",
      permission: "admin.roles.index",
      tag: this.tags.admin_system,
    },

    {
      name: "Paises",
      url: "/administracion-sistema/paises",
      icon: "icon-globe",
      permission: "admin.countries.index",
      tag: this.tags.admin_system,
    },
    {
      name: "Locaciones",
      url: "/administracion-sistema/locaciones",
      icon: "icon-directions",
      permission: "admin.locations.index",
      tag: this.tags.admin_system,
    },
    {
      name: "Mercado Libre",
      url: "/administracion-sistema/mercado-libre/cuentas",
      icon: "far fa-handshake",
      permission: "ml.accounts.index",
      tag: this.tags.admin_system,
    },
    {
      name: "Facebook Ads Manager",
      url: "/administracion-sistema/facebook-ads-manager",
      icon: "icon-bag",
      permission: "admin.facebook-ads.campaigns.index",
      tag: this.tags.admin_system,
    },
    //#endregion

    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   title: true,
    //   name: 'Informacion General',

    // },
    // {
    //   name: 'Importaciones',
    //   url: '/theme/colors',
    //   icon: 'icon-cloud-upload',
    // },

    // {
    //   title: true,
    //   name: "Administracion de productos",
    // },
    // {
    //   name: "Productos",
    //   url: "/admin-products/productos",
    //   icon: "icon-basket",
    //   permission: "products-admin.products.index",
    // },
    // {
    //   name: "Categoria",
    //   url: "/admin-products/categorias",
    //   icon: "icon-badge",
    //   permission: "products-admin.categories.index",
    // },
    // {
    //   name: "Marcas",
    //   url: "/admin-products/marcas",
    //   icon: "icon-bag",
    //   permission: "products-admin.brands.index",
    // },
    // {
    //   name: "Prefijos",
    //   url: "/admin-products/prefijos",
    //   icon: "fab fa-autoprefixer",
    //   permission: "products-admin.prefixes.index",
    // },

    // {
    //   title: true,
    //   name: "Catalogo",
    // },
    // {
    //   name: "Buscar producto",
    //   url: "/catalogo/buscar_productos",
    //   icon: "fas fa-search",
    //   permission: "catalogs.products.index",
    // },
    // {
    //   name: "Mercado libre",
    //   url: "/catalogo/mercado-libre",
    //   icon: "far fa-handshake",
    //   permission: "catalogs.ml-products.index",
    // },
    // {
    //   name: "Publicaciones",
    //   url: "/catalogo/publicaciones",
    //   icon: "fab fa-telegram-plane",
    //   permission: "catalogs.publications.index",
    // },

    // {
    //   title: true,
    //   name: "Importaciones",
    // },
    // {
    //   name: "Proveedores",
    //   url: "/importaciones/proveedores",
    //   icon: "icon-briefcase",
    //   permission: "purchase-department.imports.index",
    // },
    // {
    //   name: "Codificar importaciones",
    //   url: "/importaciones/codificar-importaciones",
    //   icon: "far fa-handshake",
    //   permission: "purchase-department.imports.index",
    // },
    // {
    //   name: "Precios y promociones",
    //   url: "/importaciones/precios-promociones",
    //   icon: "icon-briefcase",
    //   permission: "purchase-department.imports.index",
    // },
    // {
    //   title: true,
    //   name: "Reportes",
    // },
    // {
    //   name: "Grupo de Productos",
    //   url: "/reports/group-products",
    //   icon: "icon-briefcase",
    //   permission: "purchase-department.imports.index",
    // },
    // {
    //   title: true,
    //   name: "Informacion general",
    // },
    // {
    //   name: "Organizacion",
    //   url: "/information-general/organizacion",
    //   icon: "icon-briefcase",
    //   permission: "purchase-department.imports.index",
    // },
    // {
    //   title: true,
    //   name: "Administracion del sistema",
    // },
    // {
    //   name: "Usuarios",
    //   url: "/administracion-sistema/usuarios",
    //   icon: "icon-user-following",
    //   permission: "admin.users.index",
    // },

    // {
    //   name: "Personas",
    //   url: "/administracion-sistema/personas",
    //   icon: "icon-user",
    //   permission: "admin.people.index",
    // },

    // {
    //   name: "Roles",
    //   url: "/administracion-sistema/roles",
    //   icon: "icon-briefcase",
    //   permission: "admin.users.index",
    // },

    // {
    //   name: "Paises",
    //   url: "/administracion-sistema/paises",
    //   icon: "icon-globe",
    //   permission: "admin.countries.index",
    // },
    // {
    //   name: "Locaciones",
    //   url: "/administracion-sistema/locaciones",
    //   icon: "icon-directions",
    //   permission: "admin.locations.index",
    // },
  ];


}
