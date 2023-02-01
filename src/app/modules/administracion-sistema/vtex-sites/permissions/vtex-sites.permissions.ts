import { PERMISSION_SUPER_ADMIN } from './../../../../core/class/constants';
export const PERMISSIONS_VTEX_SITES = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.vtex.sites.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.vtex.sites.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.vtex.sites.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.vtex.sites.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.vtex.sites.destroy'],
}