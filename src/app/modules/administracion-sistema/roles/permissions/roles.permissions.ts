import { PERMISSION_SUPER_ADMIN } from './../../../../core/class/constants';
export const PERMISSIONS_ROLES = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.roles.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.roles.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.roles.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.roles.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.roles.destroy'],
}