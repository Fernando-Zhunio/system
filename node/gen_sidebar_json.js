"use strict";

const fs = require("fs");

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
const menuItem = [
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

function generateJsonMenu() {
  let menuClean = {};
  let menu = [];
  menuItem.forEach((item) => {
    if (item.hasOwnProperty("permission")) {
      const _item = [
        {
          name: item.name,
          url: item.url,
          icon: item.icon,
          permission: item.permission,
        }
      ];
      // if (menu[item.tag])
       menu.push(_item); 
      // else {
      //   menu[item.tag] = [_item];
      // }
    }
  });

  let data = JSON.stringify({ menu });
  console.log(menu);
  // let dataClean = JSON.stringify({ menuClean });
  fs.writeFileSync("src/assets/json/permission-items-for-server-seeder.json", data);

  // for (const property in tagsTitle) {
  //   if (menu[property]) {
  //     menu[property] = {
  //       title: tagsTitle[property],
  //       items: [menu[property]],
  //     }
  //     menuClean[property] = {
  //       title: tagsTitle[property],
  //       items: [],
  //     };

  //   }
  // };
  // let data = JSON.stringify({ menu });
  // let dataClean = JSON.stringify({ menuClean });
  // fs.writeFileSync("src/assets/json/permission-items.json", data);
  // fs.writeFileSync("src/assets/json/permission-items-clean.json", dataClean);

  return "Exito al generar archivos!";
}

console.log(generateJsonMenu());
