import {  IItemSidebar } from '../interfaces/iitemsidebar';

 export const AllItemsSidebar: [string, IItemSidebar][]  = [
      [
        'home',
        {
          'name': 'Inicio',
          'url': '/home/inicio',
          'icon': 'icon-home',
          'permission': 'home',
          'group': 'home',
        }
      ],
      [
        'dashboard',
        {
          'name': 'Dashboard',
          'url': '/home/dashboard',
          'icon': 'icon-speedometer',
          'permission': 'dashboard',
          'group': 'home'
        }
      ],
      [
        'rrhh-dashboard',
        {
          'name': 'Dashboard Rrhh',
          'url': '/recursos-humanos/dashboard',
          'icon': 'icon-star',
          'permission': 'rrhh-dashboard',
          'group': 'rrhh'
        }
      ],
      [
        'rrhh-works',
        {
          'name': 'Empleos',
          'url': '/recursos-humanos/works',
          'icon': 'icon-star',
          'permission': 'rrhh-works',
          'group': 'rrhh'
        }
      ],
      [
        'rrhh-appointments',
        {
          'name': 'Citas',
          'url': '/recursos-humanos/appointments',
          'icon': 'icon-star',
          'permission': 'rrhh-appointments',
          'group': 'rrhh'
        }
      ],
      [
        'rrhh-requests',
        {
          'name': 'Solicitudes',
          'url': '/recursos-humanos/requests',
          'icon': 'icon-star',
          'permission': 'rrhh-requests',
          'group': 'rrhh'
        }
      ],
      [
        'rrhh-users-web',
        {
          'name': 'Usuarios Web',
          'url': '/recursos-humanos/users-web',
          'icon': 'icon-star',
          'permission': 'rrhh-users-web',
          'group': 'rrhh'
        }
      ],
      [
        'products-admin.products.index',
        {
          'name': 'Productos',
          'url': '/admin-products/productos',
          'icon': 'icon-basket',
          'permission': 'products-admin.products.index',
          'group': 'admin_products'
        }
      ],
      [
        'products-admin.products.index',
        {
          'name': 'Vtex Productos',
          'url': '/admin-products/vtex-products',
          'icon': 'icon-basket',
          'permission': 'products-admin.products.index',
          'group': 'admin_products'
        }
      ],
      [
        'products-admin.categories.index',
        {
          'name': 'Categoría',
          'url': '/admin-products/categorias',
          'icon': 'icon-badge',
          'permission': 'products-admin.categories.index',
          'group': 'admin_products'
        }
      ],
      [
        'products-admin.brands.index',
        {
          'name': 'Marcas',
          'url': '/admin-products/marcas',
          'icon': 'icon-bag',
          'permission': 'products-admin.brands.index',
          'group': 'admin_products'
        }
      ],
      [
        'products-admin.prefixes.index',
        {
          'name': 'Prefijos',
          'url': '/admin-products/prefijos',
          'icon': 'fab fa-autoprefixer',
          'permission': 'products-admin.prefixes.index',
          'group': 'admin_products'
        }
      ],
      [
        'catalogs.products.index',
        {
          'name': 'Buscar producto',
          'url': '/catalogo/buscar_productos',
          'icon': 'fas fa-search',
          'permission': 'catalogs.products.index',
          'group': 'catalogs'
        }
      ],
      [
        'catalogs.ml-products.index',
        {
          'name': 'Mercado libre',
          'url': '/catalogo/mercado-libre',
          'icon': 'far fa-handshake',
          'permission': 'catalogs.ml-products.index',
          'group': 'catalogs'
        }
      ],
      [
        'catalogs.products.prices.index',
        {
          'name': 'Precios',
          'url': '/catalogo/products/prices',
          'icon': 'fas fa-dollar-sign',
          'permission': 'catalogs.products.prices.index',
          'group': 'catalogs'
        }
      ],
      [
        'catalogs.promotions.index',
        {
          'name': 'Promociones',
          'url': '/catalogo/promotions',
          'icon': 'cui-tags',
          'permission': 'catalogs.promotions.index',
          'group': 'catalogs'
        }
      ],
      [
        'catalogs.publications.index',
        {
          'name': 'Publicaciones',
          'url': '/catalogo/publicaciones',
          'icon': 'fab fa-telegram-plane',
          'permission': 'catalogs.publications.index',
          'group': 'catalogs'
        }
      ],
      [
        'purchase-department.imports.index',
        {
          'name': 'Importaciones',
          'url': '/importaciones/index',
          'icon': 'icon-briefcase',
          'permission': 'purchase-department.imports.index',
          'group': 'imports'
        }
      ],
      [
        'purchase-department.imports.index',
        {
          'name': 'Codificar importaciones',
          'url': '/importaciones/codificar-importaciones',
          'icon': 'far fa-handshake',
          'permission': 'purchase-department.imports.index',
          'group': 'imports'
        }
      ],
      [
        'purchase-department.imports.index',
        {
          'name': 'Precios y promociones',
          'url': '/importaciones/precios-promociones',
          'icon': 'icon-briefcase',
          'permission': 'purchase-department.imports.index',
          'group': 'imports'
        }
      ],
      [
        'reports.group-products.index',
        {
          'name': 'Grupo de Productos',
          'url': '/reports/group-products',
          'icon': 'icon-briefcase',
          'permission': 'reports.group-products.index',
          'group': 'reports'
        }
      ],
      [
        'reports.general-stock.export',
        {
          'name': 'Download stock',
          'url': '/reports/general-stock',
          'icon': 'icon-cloud-download',
          'permission': 'reports.general-stock.export',
          'group': 'reports'
        }
      ],
      [
        'orders.orders.index',
        {
          'name': 'Ordenes',
          'url': '/orders',
          'icon': 'cui-basket-loaded',
          'permission': 'orders.orders.index',
          'group': 'orders'
        }
      ],
      [
        'general.organization.index',
        {
          'name': 'Organización',
          'url': '/information-general/organizacion',
          'icon': 'icon-briefcase',
          'permission': 'general.organization.index',
          'group': 'info_general'
        }
      ],
      [
        'admin.chatbot.index',
        {
          'name': 'Chat Bots',
          'url': '/administracion-sistema/chatbot',
          'icon': 'icon-social-reddit',
          'permission': 'admin.chatbot.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.companies.index',
        {
          'name': 'Empresas',
          'url': '/administracion-sistema/companies',
          'icon': 'icon-directions',
          'permission': 'admin.companies.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.facebook-ads.campaigns.index',
        {
          'name': 'Facebook Ads Manager',
          'url': '/administracion-sistema/facebook-ads-manager',
          'icon': 'icon-bag',
          'permission': 'admin.facebook-ads.campaigns.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.prices.groups.index',
        {
          'name': 'Grupo de precios',
          'url': '/administracion-sistema/prices/groups',
          'icon': 'fas fa-dollar-sign',
          'permission': 'admin.prices.groups.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.locations.index',
        {
          'name': 'Locaciones',
          'url': '/administracion-sistema/locaciones',
          'icon': 'icon-directions',
          'permission': 'admin.locations.index',
          'group': 'admin_system'
        }
      ],
      [
        'ml.accounts.index',
        {
          'name': 'Mercado Libre',
          'url': '/administracion-sistema/mercado-libre/cuentas',
          'icon': 'far fa-handshake',
          'permission': 'ml.accounts.index',
          'group': 'admin_system'
        }
      ],
      [
        'newsletters',
        {
          'name': 'Novedades',
          'url': '/administracion-sistema/newsletter',
          'icon': 'icon-bag',
          'permission': 'newsletters',
          'group': 'admin_system'
        }
      ],
      [
        'admin.countries.index',
        {
          'name': 'Países',
          'url': '/administracion-sistema/paises',
          'icon': 'icon-globe',
          'permission': 'admin.countries.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.people.index',
        {
          'name': 'Personas',
          'url': '/administracion-sistema/personas',
          'icon': 'icon-user',
          'permission': 'admin.people.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.roles.index',
        {
          'name': 'Roles',
          'url': '/administracion-sistema/roles',
          'icon': 'icon-briefcase',
          'permission': 'admin.roles.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.users.index',
        {
          'name': 'Usuarios',
          'url': '/administracion-sistema/usuarios',
          'icon': 'icon-user-following',
          'permission': 'admin.users.index',
          'group': 'admin_system'
        }
      ],
      [
        'admin.vtex.sites.index',
        {
          'name': 'Vtex Sites',
          'url': '/administracion-sistema/vtex-sites',
          'icon': 'icon-bag',
          'permission': 'admin.vtex.sites.index',
          'group': 'admin_system'
        }
      ],
      [
        'super-admin',
        {
          'name': 'Webhooks',
          'url': '/administracion-sistema/webhooks/webhooks-url',
          'icon': 'icon-wrench',
          'permission': 'super-admin',
          'group': 'admin_system'
        }
      ]
    ];