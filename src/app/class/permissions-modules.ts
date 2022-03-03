
export const permission_home = {
    home: 'home',
    dashboard: 'dashboard',
};

export const permission_rrhh = {
    dashboard: 'rrhh-dashboard',
    works: 'rrhh-works',
    appointments: 'rrhh-appointments',
    requests: 'rrhh-requests',
    users_web: 'rrhh-users-web',
};

export const permission_admin_products = {
    categories: {
        index: 'products-admin.categories.index',
        show: 'products-admin.categories.show',
        create: 'products-admin.categories.create',
        edit: 'products-admin.categories.edit',
        delete: 'products-admin.categories.delete',
    }
};

export const permissionsModuleOrders = {
    index: ['super-admin', 'system-orders.index'],
    show: ['super-admin', 'system-orders.show'],
    create: ['super-admin', 'system-orders.create'],
    edit: ['super-admin', 'system-orders.edit'],
    delete: ['super-admin', 'system-orders.delete'],
};

export const permissionsModuleOrdersClients = {
    index: ['super-admin', 'system-orders.clients.index'],
    show: ['super-admin', 'system-orders.clients.show'],
    create: ['super-admin', 'system-orders.clients.create'],
    edit: ['super-admin', 'system-orders.clients.edit'],
    delete: ['super-admin', 'system-orders.clients.delete'],
};
