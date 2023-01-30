import { PERMISSION_SUPER_ADMIN } from '../../../../core/class/constants';
export const PERMISSIONS_COUNTRIES = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.countries.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.countries.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.countries.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.countries.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.countries.destroy'],
}

export const PERMISSIONS_CITIES = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.countries.cities.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.countries.cities.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.countries.cities.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.countries.cities.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.countries.cities.destroy'],
}