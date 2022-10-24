 const trans_es_promotions = {
    permanent: 'Permanente',
    date_range: 'Rango de fechas',
    out_stock: 'Hasta agotar stock'
};

const trans_es_default = {
    active: 'Activo',
    inactive: 'Inactivo',
    closed: 'Cerrado',
    date_range: 'Rango de fechas',
    open: 'Abierto',
    undefined: 'Indefinido',
    expired: 'Expirado',
};

const trans_es_order = {
    tax: 'Impuestos',
    percent: 'Porcentaje',
    retention: 'Retención',
    discount: 'Descuento',
    fixed: 'Fijo',
    default: 'Por defecto',
    receivable: 'Por cobrar',
    payment_with_retention: 'Por pago con retención',
    reservation_paid : 'Por reserva pagada',

    credit_card: 'Tarjeta de crédito',
    cash: 'Efectivo',
    debit_card: 'Tarjeta de débito',
    wire: 'Transferencia',
    wire_transfer: 'Transferencia',
    paymentez: 'Paymentez',

    pending: 'Pendiente',
    paid: 'Pagado',
    refunded: 'Reembolsado',
    cancelled: 'Cancelado',
    created: 'Creado',
    generated_guide: 'Guía generada',
    shipped: 'Enviado',
    in_transit: 'En tránsito',
    delivered: 'Entregado',
    returned: 'Devuelto',
    confirmed: 'Confirmado',

    payment_paid: 'Pagado',
    payment_partially_paid: 'Parcialmente pagado',
    payment_refunded: 'Reembolsado',
    payment_partially_refunded: 'Parcialmente reembolsado',

    shipping_shipped: 'Enviado',
    shipping_partially_shipped: 'Parcialmente enviado',
    shipping_partially_delivered: 'Parcialmente entregado',
    shipping_returned: 'Devuelto',
    shipping_partially_returned: 'Parcialmente devuelto',
    shipping_delivered: 'Entregado',
    shipping_partially_processed: 'Envío Parcialmente procesado',
    shipping_processed: 'Envío procesado',
    generated: 'Generado',
    in_review: 'En revisión',
    rejected: 'Rechazado',
    expired: 'Expirado',
    init: 'Iniciado',
    processed: 'Procesado',

    published: 'Publicado',
    canceled: 'Cancelado',
    deferred: 'Diferido',
    single: 'Corriente',

    sended: 'Solicitada',
    partially_confirmed: 'Parcialmente confirmada',
    unsynced: 'Esperando sincronización',
};

const typeMethodPayment = {
'Credit Card': 'Tarjeta de crédito',
'Boleto (Bank Ticket)': 'Boleto (Bank Ticket)',
'E-wallet': 'E-wallet',
'Vouchers Card': 'Vouchers Card',
'Bank Transfer': 'Transferencia',
'Debit Card': 'Tarjeta de débito',
'Prepaid Card': 'Tarjeta prepagada',
}

const trans_es_order_channels = {
    'webstore': 'Pagina Web',
    'whatsapp': 'Whatsapp',
    'marketplace': 'Tienda',
    'other' : 'Otro medio'
};

export const _transfz:  {} = {
    promotions: {...trans_es_promotions},
    default: {...trans_es_default},
    orders: trans_es_order,
    order_channels: trans_es_order_channels,
    method_pay: typeMethodPayment
};

/**
 * @param value  valor
 * @param name nombre del la sección
 * @returns traduccion
 */
export function trans(value, name) {
    if ( _transfz[name]) {
        return _transfz[name][value];
    }
    return 'error traducción';
};
