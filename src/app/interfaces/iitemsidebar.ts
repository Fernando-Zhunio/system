export interface IItemSidebar {
    name: string;
    url: string;
    icon: string;
    permission: string;
    group: string;
}

export enum ESidebarGroups {
    admin_products = 'admin_products',
    catalogs = 'catalogs',
    imports = 'imports',
    reports = 'reports',
    info_general = 'info_general',
    admin_system = 'admin_system',
    rrhh = 'rrhh',
    home = 'home',
    orders = 'orders',
    others = 'others',
  }
