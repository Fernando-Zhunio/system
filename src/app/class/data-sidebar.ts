export class DataSidebar {

  public  tags = {
    admin_products: 'section_admin_products',
    catalogs: 'section_catalogo',
    imports: 'section_imports',
    reports: 'section_report',
    info_general: 'section_info_general',
    admin_system: 'section_admin_system',
    rrhh: 'section_rrhh',
    home: 'section_home',
    orders: 'section_orders',
  };

  public NavItems = [
    {
      title: true,
      name: 'Home',
    },
    {
      name: 'Inicio',
      url: '/home/inicio',
      icon: 'icon-home',
      permission: 'home',
      tag: this.tags.home,
    },
    {
      name: 'Dashboard',
      url: '/home/dashboard',
      icon: 'icon-speedometer',
      permission: 'dashboard',
      tag: this.tags.home,
    },
    // #region rrhh
    {
      title: true,
      name: 'Recursos Humanos',
    },
    {
      name: 'Dashboard Rrhh',
      url: '/recursos-humanos/dashboard',
      icon: 'icon-star',
      permission: 'rrhh-dashboard',
      tag: this.tags.rrhh,
    },
    {
      name: 'Empleos',
      url: '/recursos-humanos/works',
      icon: 'icon-star',
      permission: 'rrhh-works',
      tag: this.tags.rrhh,
    },
    {
      name: 'Citas',
      url: '/recursos-humanos/appointments',
      icon: 'icon-star',
      permission: 'rrhh-appointments',
      tag: this.tags.rrhh,
    },
    {
      name: 'Solicitudes',
      url: '/recursos-humanos/requests',
      icon: 'icon-star',
      permission: 'rrhh-requests',
      tag: this.tags.rrhh,
    },
    {
      name: 'Usuarios Web',
      url: '/recursos-humanos/users-web',
      icon: 'icon-star',
      permission: 'rrhh-users-web',
      tag: this.tags.rrhh,
    },
    //#endregion rrhh

    //#region admin products
    {
      title: true,
      name: 'Administración de productos',
    },
    {
      name: 'Productos',
      url: '/admin-products/productos',
      icon: 'icon-basket',
      permission: 'products-admin.products.index',
      tag: this.tags.admin_products,
    },
    {
      name: 'Vtex Productos',
      url: '/admin-products/vtex-products',
      icon: 'icon-basket',
      permission: 'products-admin.products.index',
      tag: this.tags.admin_products,
    },
    {
      name: 'Categoría',
      url: '/admin-products/categorias',
      icon: 'icon-badge',
      permission: 'products-admin.categories.index',
      tag: this.tags.admin_products,
    },
    {
      name: 'Marcas',
      url: '/admin-products/marcas',
      icon: 'icon-bag',
      permission: 'products-admin.brands.index',
      tag: this.tags.admin_products,
    },
    {
      name: 'Prefijos',
      url: '/admin-products/prefijos',
      icon: 'fab fa-autoprefixer',
      permission: 'products-admin.prefixes.index',
      tag: this.tags.admin_products,
    },

    //#endregion

    //#region Catalogos
    {
      title: true,
      name: 'Catalogo',
    },
    {
      name: 'Buscar producto',
      url: '/catalogo/buscar_productos',
      icon: 'fas fa-search',
      permission: 'catalogs.products.index',
      tag: this.tags.catalogs,
    },
    {
      name: 'Mercado libre',
      url: '/catalogo/mercado-libre',
      icon: 'far fa-handshake',
      permission: 'catalogs.ml-products.index',
      tag: this.tags.catalogs,
    },
    {
      name: 'Precios',
      url: '/catalogo/products/prices',
      icon: 'fas fa-dollar-sign',
      permission: 'catalogs.products.prices.index',
      tag: this.tags.catalogs,
    },
    {
      name: 'Promociones',
      url: '/catalogo/promotions',
      icon: 'cui-tags',
      permission: 'catalogs.promotions.index',
      tag: this.tags.catalogs,
    },
    {
      name: 'Publicaciones',
      url: '/catalogo/publicaciones',
      icon: 'fab fa-telegram-plane',
      permission: 'catalogs.publications.index',
      tag: this.tags.catalogs,
    },

    //#endregion

    //#region imports
    {
      title: true,
      name: 'Importaciones',
    },
    {
      name: 'Importaciones',
      url: '/importaciones/index',
      icon: 'icon-briefcase',
      permission: 'purchase-department.imports.index',
      tag: this.tags.imports,
    },
    {
      name: 'Codificar importaciones',
      url: '/importaciones/codificar-importaciones',
      icon: 'far fa-handshake',
      permission: 'purchase-department.imports.index',
      tag: this.tags.imports,
    },
    {
      name: 'Precios y promociones',
      url: '/importaciones/precios-promociones',
      icon: 'icon-briefcase',
      permission: 'purchase-department.imports.index',
      tag: this.tags.imports,
    },
    //#endregion

    //#region Reportes
    {
      title: true,
      name: 'Reportes',
    },
    {
      name: 'Grupo de Productos',
      url: '/reports/group-products',
      icon: 'icon-briefcase',
      permission: 'reports.group-products.index',
      tag: this.tags.reports,
    },
    {
      name: 'Download stock',
      url: '/reports/general-stock',
      icon: 'icon-cloud-download',
      permission: 'reports.general-stock.export',
      tag: this.tags.reports,
    },
    //#endregion

    //#region orders
    {
      title: true,
      name: 'Ordenes',
    },
    {
      name: 'Ordenes',
      url: '/orders',
      icon: 'cui-basket-loaded',
      permission: 'orders.orders.index',
      tag: this.tags.orders,
    },


    //#endregion orders

    //#region info general
    {
      title: true,
      name: 'Informacion general',
    },
    {
      name: 'Organizacion',
      url: '/information-general/organizacion',
      icon: 'icon-briefcase',
      // este permimso no existe
      permission: 'general.organization.index',
      tag: this.tags.info_general,
    },
    //#endregion

    //#region admin system
    {
      title: true,
      name: 'Administracion del sistema',
    },
    {
      name: 'Chat Bots',
      url: '/administracion-sistema/chatbot',
      icon: 'icon-social-reddit',
      permission: 'admin.chatbot.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Empresas',
      url: '/administracion-sistema/companies',
      icon: 'icon-home',
      permission: 'admin.companies.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Facebook Ads Manager',
      url: '/administracion-sistema/facebook-ads-manager',
      icon: 'icon-bag',
      permission: 'admin.facebook-ads.campaigns.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Grupo de precios',
      url: '/administracion-sistema/prices/groups',
      icon: 'fas fa-dollar-sign',
      permission: 'admin.prices.groups.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Locaciones',
      url: '/administracion-sistema/locaciones',
      icon: 'icon-directions',
      permission: 'admin.locations.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Mercado Libre',
      url: '/administracion-sistema/mercado-libre/cuentas',
      icon: 'far fa-handshake',
      permission: 'ml.accounts.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Novedades',
      url: '/administracion-sistema/newsletter',
      icon: 'icon-bag',
      permission: 'newsletters',
      tag: this.tags.admin_system,
    },
    {
      name: 'Países',
      url: '/administracion-sistema/paises',
      icon: 'icon-globe',
      permission: 'admin.countries.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Permisos y Grupos',
      url: '/administracion-sistema/permissions',
      icon: 'icon-like',
      permission: 'admin.permissions.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Personas',
      url: '/administracion-sistema/personas',
      icon: 'icon-user',
      permission: 'admin.people.index',
      tag: this.tags.admin_system,
    },

    {
      name: 'Roles',
      url: '/administracion-sistema/roles',
      icon: 'icon-briefcase',
      permission: 'admin.roles.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Usuarios',
      url: '/administracion-sistema/usuarios',
      icon: 'icon-user-following',
      permission: 'admin.users.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Vtex Sites',
      url: '/administracion-sistema/vtex-sites',
      icon: 'icon-bag',
      permission: 'admin.vtex.sites.index',
      tag: this.tags.admin_system,
    },
    {
      name: 'Webhooks',
      url: '/administracion-sistema/webhooks/webhooks-url',
      icon: 'icon-wrench',
      permission: 'super-admin',
      tag: this.tags.admin_system,
    },

    //#endregion
  ];
  public  NameGroupItem = {
    section_home: [
      {
        title: true,
        name: 'Home',
      }
    ],
    section_info_general: [
      {
        title: true,
        name: 'Información General',
      },
    ],

    section_catalogo: [
      {
        title: true,
        name: 'Catalogo',
      },
    ],

    section_admin_products: [
      {
        title: true,
        name: 'Administración de Producto',
      },
    ],

    section_imports: [
      {
        title: true,
        name: 'Importaciones',
      },
    ],

    section_admin_system: [
      {
        title: true,
        name: 'Administración del sistema',
      },
    ],

    section_report: [
      {
        title: true,
        name: 'Reportes',
      },
    ],
    section_rrhh: [
      {
        title: true,
        name: 'Recursos Humanos',
      },
    ],
    section_orders: [
      {
        title: true,
        name: 'Ordenes',
      },
    ],

  };

}
