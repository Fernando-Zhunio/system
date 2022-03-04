 const trans_es_promotions = {
    permanent: 'Permanente',
    date_range: 'Rango de fechas',
    out_stock: 'Hasta agotar stock'
};

const trans_es_default = {
    active: 'Activo',
    inactive: 'Inactivo',
    closed: 'Cerrado',
};

const trans_es_order_types = {
        'default': 'Por defecto',
        'receivable': 'Por cobrar',
        'payment_with_retention': 'Por pago con retención',
        'reservation_paid' : 'Por reserva pagada'
};

const trans_es_order_channels = {
    'webstore': 'Pagina Web',
    'whatsapp': 'Whatsapp',
    'marketplace': 'Tienda',
    'other' : 'Otro medio'
};

export const _transfz:  {} = {
    promotions: {...trans_es_promotions},
    default: {...trans_es_default},
    orders: trans_es_order_types,
    order_channels: trans_es_order_channels
};

/**
 * @param value  valor
 * @param name nombre del la seccion
 * @returns traduccion
 */
export function trans(value, name) {
    if ( _transfz[name])
    {
        return _transfz[name][value];
    }
    return 'no encontrado';
};
