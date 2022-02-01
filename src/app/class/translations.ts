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

export const _transfz:  {} = {
    promotions: {...trans_es_promotions},
    default: {...trans_es_default}
};

export function trans(value, name) {
    if ( _transfz[name])
    {
        return _transfz[name][value];
    }
    return 'no encontrado';
};
