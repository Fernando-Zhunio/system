 const trans_es_promotions = {
    permanent: 'Permanente',
    date_range: 'Rango de fechas',
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
    // console.log(_transfz['default']);
    // console.log(_transfz['default']['active']);
    
    if ( _transfz[name])
    {
        return _transfz[name][value];
    }
    return 'no encontrado';
};
