import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const PERMISSIONS_PERMISSIONS = {
    create: [PERMISSION_SUPER_ADMIN, 'admin.permissions.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.permissions.edit'],
    destroy: [PERMISSION_SUPER_ADMIN, 'admin.permissions.destroy'],
}