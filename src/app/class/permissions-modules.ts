
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


  //#region 
    //orders system orders
export  enum EPermissionOrders {
     ORDER_SYSTEM_ORDER_INDEX = 'system-orders.orders.index',
     ORDER_SYSTEM_ORDER_CREATE = 'system-orders.orders.create',
     ORDER_SYSTEM_ORDER_EDIT = 'system-orders.orders.edit',
     ORDER_SYSTEM_ORDER_DESTROY = 'system-orders.orders.destroy',
}
    //orders system orders items
export  enum EPermissionOrdersItems {
     ORDER_SYSTEM_ORDER_ITEMS_INDEX = 'system-orders.orders.items.index',
     ORDER_SYSTEM_ORDER_ITEMS_CREATE = 'system-orders.orders.items.create',
     ORDER_SYSTEM_ORDER_ITEMS_EDIT = 'system-orders.orders.items.edit',
     ORDER_SYSTEM_ORDER_ITEMS_DESTROY = 'system-orders.orders.items.destroy',
}
    //orders system orders shippings
export  enum EPermissionOrdersShippings {
     ORDER_SYSTEM_ORDER_SHIPPINGS_INDEX = 'system-orders.orders.shippings.index',
     ORDER_SYSTEM_ORDER_SHIPPINGS_CREATE = 'system-orders.orders.shippings.create',
     ORDER_SYSTEM_ORDER_SHIPPINGS_EDIT = 'system-orders.orders.shippings.edit',
     ORDER_SYSTEM_ORDER_SHIPPINGS_DESTROY = 'system-orders.orders.shippings.destroy',
     ORDER_SYSTEM_ORDER_SHIPPINGS_SEND = 'system-orders.orders.shippings.send',
}
    //orders system orders payments
export  enum EPermissionOrdersPayments {
     ORDER_SYSTEM_ORDER_PAYMENTS_INDEX = 'system-orders.orders.payments.index',
     ORDER_SYSTEM_ORDER_PAYMENTS_CREATE = 'system-orders.orders.payments.create',
     ORDER_SYSTEM_ORDER_PAYMENTS_EDIT = 'system-orders.orders.payments.edit',
     ORDER_SYSTEM_ORDER_PAYMENTS_DESTROY = 'system-orders.orders.payments.destroy',
}
    //orders system orders additional amounts
export  enum EPermissionOrdersAdditionalAmounts {
     ORDER_SYSTEM_ORDER_ADDITIONAL_AMOUNTS_INDEX = 'system-orders.orders.additional-amounts.index',
     ORDER_SYSTEM_ORDER_ADDITIONAL_AMOUNTS_CREATE = 'system-orders.orders.additional-amounts.create',
     ORDER_SYSTEM_ORDER_ADDITIONAL_AMOUNTS_EDIT = 'system-orders.orders.additional-amounts.edit',
     ORDER_SYSTEM_ORDER_ADDITIONAL_AMOUNTS_DESTROY = 'system-orders.orders.additional-amounts.destroy',
}
    //orders system orders transfers mba
export  enum EPermissionOrdersTransfersMba {
     ORDER_SYSTEM_ORDER_TRANSFERS_MBA_INDEX = 'system-orders.orders.transfers-mba.index',
     ORDER_SYSTEM_ORDER_TRANSFERS_MBA_CREATE = 'system-orders.orders.transfers-mba.create',
     ORDER_SYSTEM_ORDER_TRANSFERS_MBA_DESTROY = 'system-orders.orders.transfers-mba.destroy',
}
    //orders system orders payments mba
export  enum EPermissionOrdersPaymentsMba {
     ORDER_SYSTEM_ORDER_PAYMENTS_MBA_CREATE = 'system-orders.orders.payments-mba.create',
     ORDER_SYSTEM_ORDER_PAYMENTS_MBA_DESTROY = 'system-orders.orders.payments-mba.destroy',
}
    //orders system orders invoices mba
export  enum EPermissionOrdersInvoicesMba {
     ORDER_SYSTEM_ORDER_INVOICES_MBA_INDEX = 'system-orders.orders.invoices-mba.index',
     ORDER_SYSTEM_ORDER_INVOICES_MBA_CREATE = 'system-orders.orders.invoices-mba.create',
     ORDER_SYSTEM_ORDER_INVOICES_MBA_DESTROY = 'system-orders.orders.invoices-mba.destroy',
}
    //orders system Clients
export  enum EPermissionOrdersClients {
     ORDER_SYSTEM_CLIENTS_INDEX = 'system-orders.clients.index',
     ORDER_SYSTEM_CLIENTS_CREATE = 'system-orders.clients.create',
     ORDER_SYSTEM_CLIENTS_EDIT = 'system-orders.clients.edit',
     ORDER_SYSTEM_CLIENTS_DESTROY = 'system-orders.clients.destroy',
}
    //orders system tickets
export  enum EPermissionOrdersTickets {
     ORDER_SYSTEM_TICKETS_INDEX = 'system-orders.tickets.index',
     ORDER_SYSTEM_TICKETS_CREATE = 'system-orders.tickets.create',
     ORDER_SYSTEM_TICKETS_EDIT = 'system-orders.tickets.edit',
}
    //orders system channels
export  enum EPermissionOrdersChannels {
     ORDER_SYSTEM_CHANNELS_INDEX = 'system-orders.channels.index',
     ORDER_SYSTEM_CHANNELS_CREATE = 'system-orders.channels.create',
     ORDER_SYSTEM_CHANNELS_EDIT = 'system-orders.channels.edit',
     ORDER_SYSTEM_CHANNELS_DESTROY = 'system-orders.channels.destroy',
}
