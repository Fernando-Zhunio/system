import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { INavData } from "@coreui/angular";
import Echo from "laravel-echo";
import { NgxPermissionsService } from "ngx-permissions";
import { environment } from "../../../environments/environment";
import { Inotification } from "../../interfaces/inotification";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { SwalService } from "../../services/swal.service";
import { navItems } from "../../_nav";

@Component({
  selector: "app-dashboard",
  styles: [
    "button {outline: none;}",
    ".dark{color:gray}",
    ".not-dark{color:goldenrod}",
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

  constructor(
    private s_auth: AuthService,
    private route: Router,
    private s_storage: StorageService,
    // private s_permission: NgxPermissionsService
  ) {}

  getValueDark(): void {
    if (!localStorage.getItem("isDark"))
      localStorage.setItem("isDark", JSON.stringify(this.isDark));
    else this.isDark = JSON.parse(localStorage.getItem("isDark"));
  }

  changeDark(value) {
    console.log(value.target.checked);
    this.isDark = value.target.checked;
    localStorage.setItem("isDark", JSON.stringify(this.isDark));
  }

  ngOnInit(): void {
    this.getValueDark();
    let user = this.s_storage.getCurrentUser();
    let username = user.name.replace(" ", "+");
    this.url_img = "https://ui-avatars.com/api/?name=" + username;
    this.companies = user.companies;
    console.log(this.companies);
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

    const endpoint = environment.server;
    const domain_serve = environment.domain_serve;
    this.navItems = this.generateSideBarItems();
    let token = "Bearer " + this.s_storage.getCurrentToken();

    // descomentar para notificaciones ------------------------------------------------------------------------------

    // const echo = new Echo({
    //   broadcaster: "pusher",
    //   cluster: "mt1",
    //   key: "03045e5e16a02b690e4c",
    //   authEndpoint: endpoint + "broadcasting/auth",
    //   wsHost: domain_serve,
    //   disableStats: true,
    //   encrypted: false,
    //   wsPort: 6001,
    //   wssPort: 6001,
    //   enabledTransports: ["ws", "wss"],
    //   forceTLS: false,
    //   auth: {
    //     headers: {
    //       Authorization: token,
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   },
    // });
    // echo.private("App.User." + user.id).notification((notify) => {
    //   console.log(notify);
    //   const dataNoty: Inotification = notify.data_rendered;
    //   console.log(dataNoty);
    //   SwalService.swalToastNotification(dataNoty.text, dataNoty.image);
    // });
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout(): void {
    this.s_auth.logout().subscribe((res: any) => {
      if (res.success) {
        this.s_storage.logout();
      }
      // if(localStorage.getItem('token'))localStorage.removeItem('token');
      // this.route.navigate(['/login'])
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
        this.route.navigateByUrl(`/`).then(() => {
          this.route.navigateByUrl(this.route.url);
        });
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

    console.log(mergePermissionAndRol);

    const sizePermissionAndRol = mergePermissionAndRol.length;

    for (let j = 0; j < sizePermissionAndRol; j++) {
      let item: INavData = this.navItems_.find(
        (x) => x.permission == mergePermissionAndRol[j]
      );
      if (item != undefined) {
        console.log(item.tag);
        this.new_Item_data[item.tag].push(item);
      }
    }

    let data_return = [];

    const keysTags = Object.keys(this.new_Item_data);
    for (let i = 0; i < keysTags.length; i++) {
      // const element = array[i];
      if(this.new_Item_data[keysTags[i]].length > 1){
        data_return.push(...this.new_Item_data[keysTags[i]])
      }
    }
    return data_return;

    // return [
    //   ...this.new_Item_data.section_admin_products,
    //   ...this.new_Item_data.section_catalogo,
    //   ...this.new_Item_data.section_imports,
    //   ...this.new_Item_data.section_info_general,
    //   ...this.new_Item_data.section_report,
    //   ...this.new_Item_data.section_admin_system,
    // ];
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
      name: "Mercado Libre Admin",
      url: "/administracion-sistema/mercado-libre/cuentas",
      icon: "far fa-handshake",
      permission: "ml.accounts.index",
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
