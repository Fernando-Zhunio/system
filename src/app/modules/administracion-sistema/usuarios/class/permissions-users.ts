import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const PERMISSIONS_ADMIN_USERS = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.users.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.users.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.users.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.users.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.users.destroy'],
}