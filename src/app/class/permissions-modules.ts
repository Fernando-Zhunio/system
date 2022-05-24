
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

// Pagina de Buscar productos
export const PermissionSearchProducts = {
 index : ['catalogs.products.index', 'super-admin'],
 show : ['catalogs.products.show', 'super-admin'],
 create : ['catalogs.products.create', 'super-admin'],
 edit : ['catalogs.products.edit', 'super-admin'],
 destroy : ['catalogs.products.destroy', 'super-admin'],
}

//orders system orders
export const PermissionOrders = {
    index: ['system-orders.orders.index', 'super-admin'],
    create: ['system-orders.orders.create', 'super-admin'],
    edit: ['system-orders.orders.edit', 'super-admin'],
    destroy: ['system-orders.orders.destroy', 'super-admin'],
}
//orders system orders items
export const PermissionOrdersItems = {
    index: ['system-orders.orders.items.index', 'super-admin'],
    create: ['system-orders.orders.items.create', 'super-admin'],
    edit: ['system-orders.orders.items.edit', 'super-admin'],
    destroy: ['system-orders.orders.items.destroy', 'super-admin'],
}
//orders system orders shippings
export const PermissionOrdersShippings = {
    index: ['system-orders.orders.shippings.index', 'super-admin'],
    create: ['system-orders.orders.shippings.create', 'super-admin'],
    edit: ['system-orders.orders.shippings.edit', 'super-admin'],
    destroy: ['system-orders.orders.shippings.destroy', 'super-admin'],
    send: ['system-orders.orders.shippings.send', 'super-admin'],
}
//orders system orders payments
export const PermissionOrdersPayments = {
    index: ['system-orders.orders.payments.index', 'super-admin'],
    create: ['system-orders.orders.payments.create', 'super-admin'],
    edit: ['system-orders.orders.payments.edit', 'super-admin'],
    destroy: ['system-orders.orders.payments.destroy', 'super-admin'],
}
//orders system orders additional amounts
export const PermissionOrdersAdditionalAmounts = {
    index: ['system-orders.orders.additional-amounts.index', 'super-admin'],
    create: ['system-orders.orders.additional-amounts.create', 'super-admin'],
    edit: ['system-orders.orders.additional-amounts.edit', 'super-admin'],
    destroy: ['system-orders.orders.additional-amounts.destroy', 'super-admin'],
}
//orders system orders transfers mba
export const PermissionOrdersTransfersMba = {
    index: ['system-orders.orders.transfers-mba.index', 'super-admin'],
    create: ['system-orders.orders.transfers-mba.create', 'super-admin'],
    destroy: ['system-orders.orders.transfers-mba.destroy', 'super-admin'],
}
//orders system orders payments mba
export const PermissionOrdersPaymentsMba = {
    index: ['system-orders.orders.payments-mba.index', 'super-admin'],
    create: ['system-orders.orders.payments-mba.create', 'super-admin'],
    destroy: ['system-orders.orders.payments-mba.destroy', 'super-admin'],
}
//orders system orders invoices mba
export const PermissionOrdersInvoicesMba = {
    index: ['system-orders.orders.invoices-mba.index', 'super-admin'],
    create: ['system-orders.orders.invoices-mba.create', 'super-admin'],
    destroy: ['system-orders.orders.invoices-mba.destroy', 'super-admin'],
}
//orders system Clients
export const PermissionOrdersClients = {
    index: ['system-orders.clients.index', 'super-admin'],
    create: ['system-orders.clients.create', 'super-admin'],
    edit: ['system-orders.clients.edit', 'super-admin'],
    destroy: ['system-orders.clients.destroy', 'super-admin'],
}
//orders system tickets
export const PermissionOrdersTickets = {
    index: ['system-orders.tickets.index', 'super-admin'],
    create: ['system-orders.tickets.create', 'super-admin'],
    edit: ['system-orders.tickets.edit', 'super-admin'],
}
//orders system channels
export const PermissionOrdersChannels = {
    index: ['system-orders.channels.index', 'super-admin'],
    create: ['system-orders.channels.create', 'super-admin'],
    edit: ['system-orders.channels.edit', 'super-admin'],
    destroy: ['system-orders.channels.destroy', 'super-admin'],
}
