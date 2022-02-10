var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("dbSidebar.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});



const fs = require("fs");
const dataSql = fs.readFileSync('seederSidebar.sqlite').toString();

const dataArr = dataSql.toString().split(');');
console.log(dataArr);
const tagsTitle = {
  admin_products: {
    title: "Administración de Productos",
    tag: "admin_products",
    icon: null,
  },
  catalogs: { title: "Catálogos", tag: "catalogs", icon: null },
  imports: { title: "Importaciones", tag: "imports", icon: null },
  reports: { title: "Reportes", tag: "reports", icon: null },
  info_general: {
    title: "Información General",
    tag: "info_general",
    icon: null,
  },
  admin_system: {
    title: "Administración del Sistema",
    tag: "admin_system",
    icon: null,
  },
  rrhh: { title: "Recursos Humanos", tag: "rrhh", icon: null },
  home: { title: "Inicio", tag: "home", icon: null },
  orders: { title: "Ordenes", tag: "orders", icon: null },
};
const tags = {
  admin_products: "admin_products",
  catalogs: "catalogs",
  imports: "imports",
  reports: "reports",
  info_general: "info_general",
  admin_system: "admin_system",
  rrhh: "rrhh",
  home: "home",
  orders: "orders",
  others: "others",
};
const menuItems = [
  {
    title: true,
    name: "Home",
  },
  {
    name: "Inicio",
    url: "/home/inicio",
    icon: "icon-home",
    permission: "home",
    tag: tags.home,
  },
  {
    name: "Dashboard",
    url: "/home/dashboard",
    icon: "icon-speedometer",
    permission: "dashboard",
    tag: tags.home,
  },
  // #region rrhh
  {
    title: true,
    name: "Recursos Humanos",
  },
  {
    name: "Dashboard Rrhh",
    url: "/recursos-humanos/dashboard",
    icon: "icon-star",
    permission: "rrhh-dashboard",
    tag: tags.rrhh,
  },
  {
    name: "Empleos",
    url: "/recursos-humanos/works",
    icon: "icon-star",
    permission: "rrhh-works",
    tag: tags.rrhh,
  },
  {
    name: "Citas",
    url: "/recursos-humanos/appointments",
    icon: "icon-star",
    permission: "rrhh-appointments",
    tag: tags.rrhh,
  },
  {
    name: "Solicitudes",
    url: "/recursos-humanos/requests",
    icon: "icon-star",
    permission: "rrhh-requests",
    tag: tags.rrhh,
  },
  {
    name: "Usuarios Web",
    url: "/recursos-humanos/users-web",
    icon: "icon-star",
    permission: "rrhh-users-web",
    tag: tags.rrhh,
  },
  //#endregion rrhh

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
    tag: tags.admin_products,
  },
  {
    name: "Vtex Productos",
    url: "/admin-products/vtex-products",
    icon: "icon-basket",
    permission: "products-admin.products.index",
    tag: tags.admin_products,
  },
  {
    name: "Categoria",
    url: "/admin-products/categorias",
    icon: "icon-badge",
    permission: "products-admin.categories.index",
    tag: tags.admin_products,
  },
  {
    name: "Marcas",
    url: "/admin-products/marcas",
    icon: "icon-bag",
    permission: "products-admin.brands.index",
    tag: tags.admin_products,
  },
  {
    name: "Prefijos",
    url: "/admin-products/prefijos",
    icon: "fab fa-autoprefixer",
    permission: "products-admin.prefixes.index",
    tag: tags.admin_products,
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
    tag: tags.catalogs,
  },
  {
    name: "Mercado libre",
    url: "/catalogo/mercado-libre",
    icon: "far fa-handshake",
    permission: "catalogs.ml-products.index",
    tag: tags.catalogs,
  },
  {
    name: "Precios",
    url: "/catalogo/products/prices",
    icon: "fas fa-dollar-sign",
    permission: "catalogs.products.prices.index",
    tag: tags.catalogs,
  },
  {
    name: "Promociones",
    url: "/catalogo/promotions",
    icon: "cui-tags",
    permission: "catalogs.promotions.index",
    tag: tags.catalogs,
  },
  {
    name: "Publicaciones",
    url: "/catalogo/publicaciones",
    icon: "fab fa-telegram-plane",
    permission: "catalogs.publications.index",
    tag: tags.catalogs,
  },

  //#endregion

  //#region imports
  {
    title: true,
    name: "Importaciones",
  },
  {
    name: "Importaciones",
    url: "/importaciones/index",
    icon: "icon-briefcase",
    permission: "purchase-department.imports.index",
    tag: tags.imports,
  },
  {
    name: "Codificar importaciones",
    url: "/importaciones/codificar-importaciones",
    icon: "far fa-handshake",
    permission: "purchase-department.imports.index",
    tag: tags.imports,
  },
  {
    name: "Precios y promociones",
    url: "/importaciones/precios-promociones",
    icon: "icon-briefcase",
    permission: "purchase-department.imports.index",
    tag: tags.imports,
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
    tag: tags.reports,
  },
  {
    name: "Download stock",
    url: "/reports/general-stock",
    icon: "icon-cloud-download",
    permission: "reports.general-stock.export",
    tag: tags.reports,
  },
  //#endregion

  //#region orders
  {
    title: true,
    name: "Ordenes",
  },
  {
    name: "Ordenes",
    url: "/orders",
    icon: "cui-basket-loaded",
    permission: "orders.orders.index",
    tag: tags.orders,
  },

  //#endregion orders

  //#region info general
  {
    title: true,
    name: "Informacion general",
  },
  {
    name: "Organizacion",
    url: "/information-general/organizacion",
    icon: "icon-briefcase",
    // este permimso no existe
    permission: "general.organization.index",
    tag: tags.info_general,
  },
  //#endregion

  //#region admin system
  {
    title: true,
    name: "Administracion del sistema",
  },
  {
    name: "Chat Bots",
    url: "/administracion-sistema/chatbot",
    icon: "icon-social-reddit",
    permission: "admin.chatbot.index",
    tag: tags.admin_system,
  },
  {
    name: "Empresas",
    url: "/administracion-sistema/companies",
    icon: "icon-directions",
    permission: "admin.companies.index",
    tag: tags.admin_system,
  },
  {
    name: "Facebook Ads Manager",
    url: "/administracion-sistema/facebook-ads-manager",
    icon: "icon-bag",
    permission: "admin.facebook-ads.campaigns.index",
    tag: tags.admin_system,
  },
  {
    name: "Grupo de precios",
    url: "/administracion-sistema/prices/groups",
    icon: "fas fa-dollar-sign",
    permission: "admin.prices.groups.index",
    tag: tags.admin_system,
  },
  {
    name: "Locaciones",
    url: "/administracion-sistema/locaciones",
    icon: "icon-directions",
    permission: "admin.locations.index",
    tag: tags.admin_system,
  },
  {
    name: "Mercado Libre",
    url: "/administracion-sistema/mercado-libre/cuentas",
    icon: "far fa-handshake",
    permission: "ml.accounts.index",
    tag: tags.admin_system,
  },
  {
    name: "Novedades",
    url: "/administracion-sistema/newsletter",
    icon: "icon-bag",
    permission: "newsletters",
    tag: tags.admin_system,
  },
  {
    name: "Países",
    url: "/administracion-sistema/paises",
    icon: "icon-globe",
    permission: "admin.countries.index",
    tag: tags.admin_system,
  },
  {
    name: "Personas",
    url: "/administracion-sistema/personas",
    icon: "icon-user",
    permission: "admin.people.index",
    tag: tags.admin_system,
  },

  {
    name: "Roles",
    url: "/administracion-sistema/roles",
    icon: "icon-briefcase",
    permission: "admin.roles.index",
    tag: tags.admin_system,
  },
  {
    name: "Usuarios",
    url: "/administracion-sistema/usuarios",
    icon: "icon-user-following",
    permission: "admin.users.index",
    tag: tags.admin_system,
  },
  {
    name: "Vtex Sites",
    url: "/administracion-sistema/vtex-sites",
    icon: "icon-bag",
    permission: "admin.vtex.sites.index",
    tag: tags.admin_system,
  },
  {
    name: "Webhooks",
    url: "/administracion-sistema/webhooks/webhooks-url",
    icon: "icon-wrench",
    permission: "super-admin",
    tag: tags.admin_system,
  },

  //#endregion
];

const rows = [
  {
    name: "home",
    description: "Ver Pagina de Inicio",
    id: 1,
    title: "Home",
    group_permission_id: 5,
  },
  {
    name: "products-admin.products.index",
    description: "Ver listado de Producto",
    id: 2,
    title: "Navegar Productos",
    group_permission_id: 4,
  },
  {
    name: "products-admin.products.show",
    description: "Ver detalle de un Producto",
    id: 3,
    title: "Ver detalle de un Producto",
    group_permission_id: 3,
  },
  {
    name: "products-admin.products.create",
    description: "Crear un o mas Productos",
    id: 4,
    title: "Crear Productos",
    group_permission_id: null,
  },
  {
    name: "products-admin.products.edit",
    description: "Editar un o mas Productos",
    id: 5,
    title: "Editar Productos",
    group_permission_id: null,
  },
  {
    name: "products-admin.products.destroy",
    description: "Eliminar un o mas Productos",
    id: 6,
    title: "Eliminar Productos",
    group_permission_id: null,
  },
  {
    name: "products-admin.categories.index",
    description: "Ver listado de Categoria",
    id: 7,
    title: "Navegar Categorias",
    group_permission_id: 4,
  },
  {
    name: "products-admin.categories.show",
    description: "Ver detalle de una Categoria",
    id: 8,
    title: "Ver detalle de una Categoria",
    group_permission_id: null,
  },
  {
    name: "products-admin.categories.create",
    description: "Crear una o mas Categorias",
    id: 9,
    title: "Crear Categorias",
    group_permission_id: null,
  },
  {
    name: "products-admin.categories.edit",
    description: "Editar una o mas Categorias",
    id: 10,
    title: "Editar Categorias",
    group_permission_id: null,
  },
  {
    name: "products-admin.categories.destroy",
    description: "Eliminar una o mas Categorias",
    id: 11,
    title: "Eliminar Categorias",
    group_permission_id: null,
  },
  {
    name: "products-admin.brands.index",
    description: "Ver listado de Marca",
    id: 12,
    title: "Navegar Marcas",
    group_permission_id: 4,
  },
  {
    name: "products-admin.brands.show",
    description: "Ver detalle de una Marca",
    id: 13,
    title: "Ver detalle de una Marca",
    group_permission_id: null,
  },
  {
    name: "products-admin.brands.create",
    description: "Crear una o mas Marcas",
    id: 14,
    title: "Crear Marcas",
    group_permission_id: null,
  },
  {
    name: "products-admin.brands.edit",
    description: "Editar una o mas Marcas",
    id: 15,
    title: "Editar Marcas",
    group_permission_id: null,
  },
  {
    name: "products-admin.brands.destroy",
    description: "Eliminar una o mas Marcas",
    id: 16,
    title: "Eliminar Marcas",
    group_permission_id: null,
  },
  {
    name: "products-admin.prefixes.index",
    description: "Ver listado de Prefijo",
    id: 17,
    title: "Navegar Prefijos",
    group_permission_id: 4,
  },
  {
    name: "products-admin.prefixes.show",
    description: "Ver detalle de un Prefijo",
    id: 18,
    title: "Ver detalle de un Prefijo",
    group_permission_id: null,
  },
  {
    name: "products-admin.prefixes.create",
    description: "Crear un o mas Prefijos",
    id: 19,
    title: "Crear Prefijos",
    group_permission_id: null,
  },
  {
    name: "products-admin.prefixes.edit",
    description: "Editar un o mas Prefijos",
    id: 20,
    title: "Editar Prefijos",
    group_permission_id: null,
  },
  {
    name: "products-admin.prefixes.destroy",
    description: "Eliminar un o mas Prefijos",
    id: 21,
    title: "Eliminar Prefijos",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.index",
    description: "Ver listado de Producto de Catalogo",
    id: 22,
    title: "Navegar Productos de Catalogo",
    group_permission_id: 3,
  },
  {
    name: "catalogs.products.show",
    description: "Ver detalle de un Producto de Catalogo",
    id: 23,
    title: "Ver detalle de un Producto de Catalogo",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.create",
    description: "Crear un o mas Productos de Catalogo",
    id: 24,
    title: "Crear Productos de Catalogo",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.edit",
    description: "Editar un o mas Productos de Catalogo",
    id: 25,
    title: "Editar Productos de Catalogo",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.destroy",
    description: "Eliminar un o mas Productos de Catalogo",
    id: 26,
    title: "Eliminar Productos de Catalogo",
    group_permission_id: null,
  },
  {
    name: "catalogs.publications.index",
    description: "Ver listado de Publicaci�n",
    id: 27,
    title: "Navegar Publicaciones",
    group_permission_id: 3,
  },
  {
    name: "catalogs.publications.show",
    description: "Ver detalle de una Publicaci�n",
    id: 28,
    title: "Ver detalle de una Publicaci�n",
    group_permission_id: null,
  },
  {
    name: "catalogs.publications.create",
    description: "Crear una o mas Publicaciones",
    id: 29,
    title: "Crear Publicaciones",
    group_permission_id: null,
  },
  {
    name: "catalogs.publications.edit",
    description: "Editar una o mas Publicaciones",
    id: 30,
    title: "Editar Publicaciones",
    group_permission_id: null,
  },
  {
    name: "catalogs.publications.destroy",
    description: "Eliminar una o mas Publicaciones",
    id: 31,
    title: "Eliminar Publicaciones",
    group_permission_id: null,
  },
  {
    name: "admin.users.index",
    description: "Ver listado de Usuario",
    id: 32,
    title: "Navegar Usuarios",
    group_permission_id: 2,
  },
  {
    name: "admin.users.show",
    description: "Ver detalle de un Usuario",
    id: 33,
    title: "Ver detalle de un Usuario",
    group_permission_id: null,
  },
  {
    name: "admin.users.create",
    description: "Crear un o mas Usuarios",
    id: 34,
    title: "Crear Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.users.edit",
    description: "Editar un o mas Usuarios",
    id: 35,
    title: "Editar Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.users.destroy",
    description: "Eliminar un o mas Usuarios",
    id: 36,
    title: "Eliminar Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.roles.index",
    description: "Ver listado de Rol de Usuario",
    id: 37,
    title: "Navegar Roles de Usuarios",
    group_permission_id: 2,
  },
  {
    name: "admin.roles.show",
    description: "Ver detalle de un Rol de Usuario",
    id: 38,
    title: "Ver detalle de un Rol de Usuario",
    group_permission_id: null,
  },
  {
    name: "admin.roles.create",
    description: "Crear un o mas Roles de Usuarios",
    id: 39,
    title: "Crear Roles de Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.roles.edit",
    description: "Editar un o mas Roles de Usuarios",
    id: 40,
    title: "Editar Roles de Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.roles.destroy",
    description: "Eliminar un o mas Roles de Usuarios",
    id: 41,
    title: "Eliminar Roles de Usuarios",
    group_permission_id: null,
  },
  {
    name: "admin.countries.index",
    description: "Ver listado de Pais",
    id: 42,
    title: "Navegar Paises",
    group_permission_id: 2,
  },
  {
    name: "admin.countries.show",
    description: "Ver detalle de un Pais",
    id: 43,
    title: "Ver detalle de un Pais",
    group_permission_id: null,
  },
  {
    name: "admin.countries.create",
    description: "Crear un o mas Paises",
    id: 44,
    title: "Crear Paises",
    group_permission_id: null,
  },
  {
    name: "admin.countries.edit",
    description: "Editar un o mas Paises",
    id: 45,
    title: "Editar Paises",
    group_permission_id: null,
  },
  {
    name: "admin.countries.destroy",
    description: "Eliminar un o mas Paises",
    id: 46,
    title: "Eliminar Paises",
    group_permission_id: null,
  },
  {
    name: "admin.countries.cities.index",
    description: "Ver listado de Ciudad",
    id: 47,
    title: "Navegar Ciudades",
    group_permission_id: 2,
  },
  {
    name: "admin.countries.cities.show",
    description: "Ver detalle de una Ciudad",
    id: 48,
    title: "Ver detalle de una Ciudad",
    group_permission_id: null,
  },
  {
    name: "admin.countries.cities.create",
    description: "Crear una o mas Ciudades",
    id: 49,
    title: "Crear Ciudades",
    group_permission_id: null,
  },
  {
    name: "admin.countries.cities.edit",
    description: "Editar una o mas Ciudades",
    id: 50,
    title: "Editar Ciudades",
    group_permission_id: null,
  },
  {
    name: "admin.countries.cities.destroy",
    description: "Eliminar una o mas Ciudades",
    id: 51,
    title: "Eliminar Ciudades",
    group_permission_id: null,
  },
  {
    name: "admin.companies.index",
    description: "Ver listado de Empresa",
    id: 52,
    title: "Navegar Empresas",
    group_permission_id: 2,
  },
  {
    name: "admin.companies.show",
    description: "Ver detalle de una Empresa",
    id: 53,
    title: "Ver detalle de una Empresa",
    group_permission_id: null,
  },
  {
    name: "admin.companies.create",
    description: "Crear una o mas Empresas",
    id: 54,
    title: "Crear Empresas",
    group_permission_id: null,
  },
  {
    name: "admin.companies.edit",
    description: "Editar una o mas Empresas",
    id: 55,
    title: "Editar Empresas",
    group_permission_id: null,
  },
  {
    name: "admin.companies.destroy",
    description: "Eliminar una o mas Empresas",
    id: 56,
    title: "Eliminar Empresas",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.index",
    description: "Ver listado de Departamento",
    id: 57,
    title: "Navegar Departamentos",
    group_permission_id: 2,
  },
  {
    name: "admin.companies.departments.show",
    description: "Ver detalle de un Departamento",
    id: 58,
    title: "Ver detalle de un Departamento",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.create",
    description: "Crear un o mas Departamentos",
    id: 59,
    title: "Crear Departamentos",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.edit",
    description: "Editar un o mas Departamentos",
    id: 60,
    title: "Editar Departamentos",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.destroy",
    description: "Eliminar un o mas Departamentos",
    id: 61,
    title: "Eliminar Departamentos",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.positions.index",
    description: "Ver listado de Cargo",
    id: 62,
    title: "Navegar Cargos",
    group_permission_id: 2,
  },
  {
    name: "admin.companies.departments.positions.show",
    description: "Ver detalle de un Cargo",
    id: 63,
    title: "Ver detalle de un Cargo",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.positions.create",
    description: "Crear un o mas Cargos",
    id: 64,
    title: "Crear Cargos",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.positions.edit",
    description: "Editar un o mas Cargos",
    id: 65,
    title: "Editar Cargos",
    group_permission_id: null,
  },
  {
    name: "admin.companies.departments.positions.destroy",
    description: "Eliminar un o mas Cargos",
    id: 66,
    title: "Eliminar Cargos",
    group_permission_id: null,
  },
  {
    name: "admin.locations.index",
    description: "Ver listado de Locaci�n",
    id: 67,
    title: "Navegar Locaciones",
    group_permission_id: 2,
  },
  {
    name: "admin.locations.show",
    description: "Ver detalle de una Locaci�n",
    id: 68,
    title: "Ver detalle de una Locaci�n",
    group_permission_id: null,
  },
  {
    name: "admin.locations.create",
    description: "Crear una o mas Locaciones",
    id: 69,
    title: "Crear Locaciones",
    group_permission_id: null,
  },
  {
    name: "admin.locations.edit",
    description: "Editar una o mas Locaciones",
    id: 70,
    title: "Editar Locaciones",
    group_permission_id: null,
  },
  {
    name: "admin.locations.destroy",
    description: "Eliminar una o mas Locaciones",
    id: 71,
    title: "Eliminar Locaciones",
    group_permission_id: null,
  },
  {
    name: "ml.accounts.index",
    description: "Ver listado de Cuenta Mercado Libre",
    id: 72,
    title: "Navegar Cuentas Mercado Libre",
    group_permission_id: 2,
  },
  {
    name: "ml.accounts.show",
    description: "Ver detalle de una Cuenta Mercado Libre",
    id: 73,
    title: "Ver detalle de una Cuenta Mercado Libre",
    group_permission_id: null,
  },
  {
    name: "ml.accounts.create",
    description: "Crear una o mas Cuentas Mercado Libre",
    id: 74,
    title: "Crear Cuentas Mercado Libre",
    group_permission_id: null,
  },
  {
    name: "ml.accounts.edit",
    description: "Editar una o mas Cuentas Mercado Libre",
    id: 75,
    title: "Editar Cuentas Mercado Libre",
    group_permission_id: null,
  },
  {
    name: "ml.accounts.destroy",
    description: "Eliminar una o mas Cuentas Mercado Libre",
    id: 76,
    title: "Eliminar Cuentas Mercado Libre",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.ml.assign",
    description: "Reasignar un item ml a un producto del sistema",
    id: 77,
    title: "Mercado Libre - Reasignar Producto",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.ml.relist",
    description: "Republicar uno o mas Productos Ml",
    id: 78,
    title: "Mercado Libre - Republicar Producto",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.ml.status.update",
    description: "Actualizar el estado de un producto",
    id: 79,
    title: "Mercado Libre - Actualizar Estado de Producto",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.ml.destroy",
    description: "Elimina uno o mas Productos Ml",
    id: 80,
    title: "Mercado Libre - Elimnar un Producto",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.ml.update",
    description: "Actualizar uno o mas Productos Ml",
    id: 81,
    title: "Mercado Libre - Actualizar por completo un producto",
    group_permission_id: null,
  },
  {
    name: "catalogs.ml-products.index",
    description: "Ver y buscar entre todos los productos ml",
    id: 82,
    title: "Mercado Libre - Listar y buscar productos",
    group_permission_id: null,
  },
  {
    name: "general.products.index",
    description: "Ver listado de Producto [Informacion General]",
    id: 83,
    title: "Navegar Productos [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "general.products.show",
    description: "Ver detalle de  Producto [Informacion General]",
    id: 84,
    title: "Ver detalle de  Producto [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "general.imports.index",
    description: "Ver listado de Importacion [Informacion General]",
    id: 85,
    title: "Navegar Importaciones [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "general.imports.show",
    description: "Ver detalle de  Importacion [Informacion General]",
    id: 86,
    title: "Ver detalle de  Importacion [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "general.promotions.index",
    description: "Ver listado de Promocion [Informacion General]",
    id: 87,
    title: "Navegar Promociones [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "general.promotions.show",
    description: "Ver detalle de  Promocion [Informacion General]",
    id: 88,
    title: "Ver detalle de  Promocion [Informacion General]",
    group_permission_id: null,
  },
  {
    name: "products-admin.imports.index",
    description:
      "Ver listado de Codificacion de Importaci�n [Administracion de Productos]",
    id: 89,
    title:
      "Navegar Codificacion de Importaciones [Administracion de Productos]",
    group_permission_id: null,
  },
  {
    name: "products-admin.imports.show",
    description:
      "Ver detalle de una Codificacion de Importaci�n [Administracion de Productos]",
    id: 90,
    title:
      "Ver detalle de una Codificacion de Importaci�n [Administracion de Productos]",
    group_permission_id: null,
  },
  {
    name: "products-admin.imports.create",
    description:
      "Crear una o mas Codificacion de Importaciones [Administracion de Productos]",
    id: 91,
    title: "Crear Codificacion de Importaciones [Administracion de Productos]",
    group_permission_id: null,
  },
  {
    name: "products-admin.imports.edit",
    description:
      "Editar una o mas Codificacion de Importaciones [Administracion de Productos]",
    id: 92,
    title: "Editar Codificacion de Importaciones [Administracion de Productos]",
    group_permission_id: null,
  },
  {
    name: "products-admin.imports.destroy",
    description:
      "Eliminar una o mas Codificacion de Importaciones [Administracion de Productos]",
    id: 93,
    title:
      "Eliminar Codificacion de Importaciones [Administracion de Productos]",
    group_permission_id: null,
  },
  {
    name: "purchase-department.imports.index",
    description: "Ver listado de Importaci�n [Departamento Compras]",
    id: 94,
    title: "Navegar Importaciones [Departamento Compras]",
    group_permission_id: null,
  },
  {
    name: "purchase-department.imports.show",
    description: "Ver detalle de una Importaci�n [Departamento Compras]",
    id: 95,
    title: "Ver detalle de una Importaci�n [Departamento Compras]",
    group_permission_id: null,
  },
  {
    name: "purchase-department.imports.create",
    description: "Crear una o mas Importaciones [Departamento Compras]",
    id: 96,
    title: "Crear Importaciones [Departamento Compras]",
    group_permission_id: null,
  },
  {
    name: "purchase-department.imports.edit",
    description: "Editar una o mas Importaciones [Departamento Compras]",
    id: 97,
    title: "Editar Importaciones [Departamento Compras]",
    group_permission_id: null,
  },
  {
    name: "purchase-department.imports.destroy",
    description: "Eliminar una o mas Importaciones [Departamento Compras]",
    id: 98,
    title: "Eliminar Importaciones [Departamento Compras]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.imports.index",
    description: "Ver listado de Importaci�n [Precios y Promociones]",
    id: 99,
    title: "Navegar Importaciones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.imports.show",
    description: "Ver detalle de una Importaci�n [Precios y Promociones]",
    id: 100,
    title: "Ver detalle de una Importaci�n [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.imports.create",
    description: "Crear una o mas Importaciones [Precios y Promociones]",
    id: 101,
    title: "Crear Importaciones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.imports.edit",
    description: "Editar una o mas Importaciones [Precios y Promociones]",
    id: 102,
    title: "Editar Importaciones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.imports.destroy",
    description: "Eliminar una o mas Importaciones [Precios y Promociones]",
    id: 103,
    title: "Eliminar Importaciones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.promotions.index",
    description: "Ver listado de Promoci�n [Precios y Promociones]",
    id: 104,
    title: "Navegar Promociones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.promotions.show",
    description: "Ver detalle de una Promoci�n [Precios y Promociones]",
    id: 105,
    title: "Ver detalle de una Promoci�n [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.promotions.create",
    description: "Crear una o mas Promociones [Precios y Promociones]",
    id: 106,
    title: "Crear Promociones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.promotions.edit",
    description: "Editar una o mas Promociones [Precios y Promociones]",
    id: 107,
    title: "Editar Promociones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.promotions.destroy",
    description: "Eliminar una o mas Promociones [Precios y Promociones]",
    id: 108,
    title: "Eliminar Promociones [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.prices.index",
    description: "Ver listado de Precio [Precios y Promociones]",
    id: 109,
    title: "Navegar Precios [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.prices.show",
    description: "Ver detalle de un Precio [Precios y Promociones]",
    id: 110,
    title: "Ver detalle de un Precio [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.prices.create",
    description: "Crear un o mas Precios [Precios y Promociones]",
    id: 111,
    title: "Crear Precios [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.prices.edit",
    description: "Editar un o mas Precios [Precios y Promociones]",
    id: 112,
    title: "Editar Precios [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "prices-and-promotions.prices.destroy",
    description: "Eliminar un o mas Precios [Precios y Promociones]",
    id: 113,
    title: "Eliminar Precios [Precios y Promociones]",
    group_permission_id: null,
  },
  {
    name: "reports.group-products.index",
    description: "Ver listado de Grupo de Producto [Reportes]",
    id: 114,
    title: "Navegar Grupos de Productos [Reportes]",
    group_permission_id: null,
  },
  {
    name: "reports.group-products.show",
    description: "Ver detalle de un Grupo de Producto [Reportes]",
    id: 115,
    title: "Ver detalle de un Grupo de Producto [Reportes]",
    group_permission_id: null,
  },
  {
    name: "reports.group-products.create",
    description: "Crear un o mas Grupos de Productos [Reportes]",
    id: 116,
    title: "Crear Grupos de Productos [Reportes]",
    group_permission_id: null,
  },
  {
    name: "reports.group-products.edit",
    description: "Editar un o mas Grupos de Productos [Reportes]",
    id: 117,
    title: "Editar Grupos de Productos [Reportes]",
    group_permission_id: null,
  },
  {
    name: "reports.group-products.destroy",
    description: "Eliminar un o mas Grupos de Productos [Reportes]",
    id: 118,
    title: "Eliminar Grupos de Productos [Reportes]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.campaigns.index",
    description: "Ver listado de Campa�a [Facebook Ads]",
    id: 119,
    title: "Navegar Campa�as [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.campaigns.show",
    description: "Ver detalle de una Campa�a [Facebook Ads]",
    id: 120,
    title: "Ver detalle de una Campa�a [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.campaigns.create",
    description: "Crear una o mas Campa�as [Facebook Ads]",
    id: 121,
    title: "Crear Campa�as [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.campaigns.edit",
    description: "Editar una o mas Campa�as [Facebook Ads]",
    id: 122,
    title: "Editar Campa�as [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.campaigns.destroy",
    description: "Eliminar una o mas Campa�as [Facebook Ads]",
    id: 123,
    title: "Eliminar Campa�as [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.adsets.index",
    description: "Ver listado de Conjunto de Anuncios [Facebook Ads]",
    id: 124,
    title: "Navegar Conjunto de Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.adsets.show",
    description: "Ver detalle de un Conjunto de Anuncios [Facebook Ads]",
    id: 125,
    title: "Ver detalle de un Conjunto de Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.adsets.create",
    description: "Crear un o mas Conjunto de Anuncios [Facebook Ads]",
    id: 126,
    title: "Crear Conjunto de Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.adsets.edit",
    description: "Editar un o mas Conjunto de Anuncios [Facebook Ads]",
    id: 127,
    title: "Editar Conjunto de Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.adsets.destroy",
    description: "Eliminar un o mas Conjunto de Anuncios [Facebook Ads]",
    id: 128,
    title: "Eliminar Conjunto de Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.ads.index",
    description: "Ver listado de Anuncio [Facebook Ads]",
    id: 129,
    title: "Navegar Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.ads.show",
    description: "Ver detalle de un Anuncio [Facebook Ads]",
    id: 130,
    title: "Ver detalle de un Anuncio [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.ads.create",
    description: "Crear un o mas Anuncios [Facebook Ads]",
    id: 131,
    title: "Crear Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.ads.edit",
    description: "Editar un o mas Anuncios [Facebook Ads]",
    id: 132,
    title: "Editar Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "admin.facebook-ads.ads.destroy",
    description: "Eliminar un o mas Anuncios [Facebook Ads]",
    id: 133,
    title: "Eliminar Anuncios [Facebook Ads]",
    group_permission_id: null,
  },
  {
    name: "reports.general-stock.export",
    description: "Descargar el stock por bodega",
    id: 134,
    title: "Descargar Stock",
    group_permission_id: null,
  },
  {
    name: "product-admin.vtex.product-vtex.index",
    description: "Ver listado de Product [Vtex]",
    id: 135,
    title: "Navegar Products [Vtex]",
    group_permission_id: null,
  },
  {
    name: "product-admin.vtex.product-vtex.show",
    description: "Ver detalle de un Product [Vtex]",
    id: 136,
    title: "Ver detalle de un Product [Vtex]",
    group_permission_id: null,
  },
  {
    name: "product-admin.vtex.product-vtex.create",
    description: "Crear un o mas Products [Vtex]",
    id: 137,
    title: "Crear Products [Vtex]",
    group_permission_id: null,
  },
  {
    name: "product-admin.vtex.product-vtex.edit",
    description: "Editar un o mas Products [Vtex]",
    id: 138,
    title: "Editar Products [Vtex]",
    group_permission_id: null,
  },
  {
    name: "product-admin.vtex.product-vtex.destroy",
    description: "Eliminar un o mas Products [Vtex]",
    id: 139,
    title: "Eliminar Products [Vtex]",
    group_permission_id: null,
  },
  {
    name: "dashboard",
    description: "Dashboard",
    id: 141,
    title: "Dashboard",
    group_permission_id: 5,
  },
  {
    name: "rrhh-dashboard",
    description: "Recursos Humanos Dashboard",
    id: 142,
    title: "Dashboard [Rrhh]",
    group_permission_id: 6,
  },
  {
    name: "rrhh-appointments",
    description: "Recursos Humanos Citas",
    id: 143,
    title: "Citas [Rrhh]",
    group_permission_id: 6,
  },
  {
    name: "rrhh-requests",
    description: "Recursos Humanos Solicitudes",
    id: 144,
    title: "Solitudes [Rrhh]",
    group_permission_id: 6,
  },
  {
    name: "rrhh-works",
    description: "Recursos Humanos Empleos",
    id: 145,
    title: "Empleos [Rrhh]",
    group_permission_id: 6,
  },
  {
    name: "rrhh-users-web",
    description: "Recursos Humanos Usuarios Web",
    id: 146,
    title: "Usuarios Web [Rrhh]",
    group_permission_id: 6,
  },
  {
    name: "newsletters",
    description: "Novedades de la pagina",
    id: 147,
    title: "Newsletters",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.prices.index",
    description: "Ver listado de Precios [Precios de productos]",
    id: 148,
    title: "Navegar Precios [Precios de productos]",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.prices.show",
    description: "Ver detalle de un Precios [Precios de productos]",
    id: 149,
    title: "Ver detalle de un Precios [Precios de productos]",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.prices.create",
    description: "Crear un o mas Precios [Precios de productos]",
    id: 150,
    title: "Crear Precios [Precios de productos]",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.prices.edit",
    description: "Editar un o mas Precios [Precios de productos]",
    id: 151,
    title: "Editar Precios [Precios de productos]",
    group_permission_id: null,
  },
  {
    name: "catalogs.products.prices.destroy",
    description: "Eliminar un o mas Precios [Precios de productos]",
    id: 152,
    title: "Eliminar Precios [Precios de productos]",
    group_permission_id: null,
  },
  {
    name: "test1",
    description: "hgvjbkml",
    id: 156,
    title: "test1",
    group_permission_id: 2,
  },
  {
    name: "testindex",
    description: "Ver listado de test",
    id: 157,
    title: "Navegar test",
    group_permission_id: 2,
  },
  {
    name: "test2",
    description: "14/12/2021",
    id: 162,
    title: "Test2",
    group_permission_id: 10,
  },
];
// seed execute

db.serialize(() => {
  // db.run runs your SQL query against the DB
  db.run("PRAGMA foreign_keys=ON;");
  db.run("PRAGMA foreign_keys;");
  db.run("BEGIN TRANSACTION;");
  // Loop through the `dataArr` and db.run each query
  dataArr.forEach((query) => {
    if (query) {
      query += ");";
      db.run(query, (err) => {
        if (err) throw err;
      });
    }});
    menuItems.forEach((item) => {
      if (item.hasOwnProperty('permission')) {
        db.get(`select id from group_permissions where slug= '${item.tag}'`, (err, row) => {
          if (err) throw err;
          if (row) {
            const group_permission_id = row.id;
            console.log(group_permission_id);
            db.run(
              `INSERT INTO itemNav (name,url,icon,permission, group_permission_id) 
             VALUES ("${item.name}","${item.url}","${item.icon}","${item.permission}",${group_permission_id});`,
              (err) => {
                if (err) throw err;
              }
            );
          }
        })
      }
    });

    db.run("COMMIT;");
  });
// });
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Closed the database connection.");
});
